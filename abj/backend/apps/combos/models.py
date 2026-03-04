"""
Combo models - Bundle of menu items
"""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Combo(models.Model):
    """Combo model - Bundle of menu items at a special price"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE,
        related_name='combos'
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    # Items in combo
    menu_items = models.ManyToManyField(
        'menu_items.MenuItem',
        related_name='combos'
    )
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    original_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    
    # Media
    image = models.ImageField(upload_to='combos/', null=True, blank=True)
    
    # Availability
    is_available = models.BooleanField(default=True)
    
    # Ratings
    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    total_ratings = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft delete
    
    class Meta:
        db_table = 'combo'
        ordering = ['restaurant', 'title']
        indexes = [
            models.Index(fields=['restaurant']),
            models.Index(fields=['is_available']),
            models.Index(fields=['-average_rating']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.restaurant.name}"
