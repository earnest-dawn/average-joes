"""
Order models - PCI-DSS compliant payment handling
"""
from django.db import models  
from django.core.validators import MinValueValidator
import uuid


class Order(models.Model):
    """Order model"""
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PREPARING', 'Preparing'),
        ('READY', 'Ready'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
        ('REFUNDED', 'Refunded'),
    ]
    
    PAYMENT_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        related_name='orders'
    )
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.SET_NULL,
        null=True,
        related_name='orders'
    )
    
    # Order details
    order_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    
    # Items (stored as JSON for historical accuracy)
    items = models.JSONField(default=dict)

    # Pricing (PCI-DSS: amounts stored safely)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    tax = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    total_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    
    # Delivery
    delivery_address = models.CharField(max_length=500)
    delivery_instructions = models.TextField(blank=True)
    estimated_delivery_time = models.IntegerField(null=True, blank=True)  # minutes
    actual_delivery_time = models.DateTimeField(null=True, blank=True)
    
    # Payment (PCI-DSS: no card details stored)
    payment_method = models.CharField(max_length=50, choices=[
        ('CARD', 'Card'),
        ('WALLET', 'Wallet'),
        ('BANK_TRANSFER', 'Bank Transfer'),
    ])
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=255, blank=True)  # Stripe payment ID
    stripe_intent_id = models.CharField(max_length=255, blank=True)
    
    # Special requests
    special_requests = models.TextField(blank=True)
    
    # Ratings (linked separately)
    # rating = ForeignKey to Rating model
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    dispatched_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'order'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['customer']),
            models.Index(fields=['restaurant']),
            models.Index(fields=['status']),
            models.Index(fields=['payment_status']),
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return f"Order {self.order_number}"
    
    def save(self, *args, **kwargs):
        # Auto-generate order number if not set
        if not self.order_number:
            import uuid as uuid_lib
            self.order_number = f"ORD-{uuid_lib.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    """Individual items in an order"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    menu_item = models.ForeignKey(
        'menu_items.MenuItem',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    combo = models.ForeignKey(
        'combos.Combo',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    total = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    
    special_instructions = models.TextField(blank=True)
    
    class Meta:
        db_table = 'order_item'
    
    def __str__(self):
        item_name = self.menu_item.name if self.menu_item else self.combo.title
        return f"{self.order.order_number} - {item_name}"
