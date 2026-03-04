"""
Shopping Cart models
"""
from django.db import models
from django.core.validators import MinValueValidator
import uuid


class Cart(models.Model):
    """Shopping cart"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='cart'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cart'
    
    def __str__(self):
        return f"Cart for {self.user.username}"
    
    def get_total(self):
        """Calculate total cart value"""
        return sum(item.get_total() for item in self.items.all())


class CartItem(models.Model):
    """Individual items in a cart"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    
    # Can be either menu item or combo
    menu_item = models.ForeignKey(
        'menu_items.MenuItem',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    combo = models.ForeignKey(
        'combos.Combo',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    quantity = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    special_instructions = models.TextField(blank=True)
    
    # Store prices at time of adding to cart (for consistency)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cart_item'
        unique_together = ('cart', 'menu_item', 'combo')
    
    def __str__(self):
        item_name = self.menu_item.name if self.menu_item else self.combo.title
        return f"{self.cart.user.username} - {item_name} x{self.quantity}"
    
    def get_total(self):
        """Calculate total for this item"""
        return self.unit_price * self.quantity
