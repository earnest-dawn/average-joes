"""
Menu Items models
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class MenuItem(models.Model):
    """Menu Item model"""
    
    CATEGORY_CHOICES = [
        ('entree', 'Entree'),
        ('side', 'Side'),
        ('drink', 'Drink'),
        ('dessert', 'Dessert'),
        ('appetizer', 'Appetizer'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE,
        related_name='menu_items'
    )
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )
    
    # Nutrition
    calories = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])
    ingredients = models.TextField(blank=True)
    allergens = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    is_vegetarian = models.BooleanField(default=False)
    is_vegan = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)
    is_spicy = models.BooleanField(default=False)
    
    # Media
    image = models.ImageField(upload_to='menu_items/', null=True, blank=True)
    images = ArrayField(models.URLField(), default=list, blank=True)
    
    # Availability
    in_stock = models.BooleanField(default=True)
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
        db_table = 'menu_item'
        ordering = ['restaurant', 'name']
        indexes = [
            models.Index(fields=['restaurant']),
            models.Index(fields=['category']),
            models.Index(fields=['in_stock']),
            models.Index(fields=['-average_rating']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"
