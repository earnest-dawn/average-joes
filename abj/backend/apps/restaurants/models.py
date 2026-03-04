"""
Restaurant models
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Restaurant(models.Model):
    """Restaurant/Vendor model"""
    
    CATEGORY_CHOICES = [
        ('Italian', 'Italian'),
        ('Chinese', 'Chinese'),
        ('Mexican', 'Mexican'),
        ('American', 'American'),
        ('Indian', 'Indian'),
        ('Thai', 'Thai'),
        ('Japanese', 'Japanese'),
        ('Mediterranean', 'Mediterranean'),
        ('Soul', 'Soul'),
        ('BBQ', 'BBQ'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='owned_restaurants'
    )
    
    # Location
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Contact
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)
    
    # Category
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    
    # Media
    logo = models.ImageField(upload_to='restaurants/logos/', null=True, blank=True)
    cover_image = models.ImageField(upload_to='restaurants/covers/', null=True, blank=True)
    images = ArrayField(models.URLField(), default=list, blank=True)
    
    # Operating hours
    monday_open = models.TimeField(null=True, blank=True)
    monday_close = models.TimeField(null=True, blank=True)
    tuesday_open = models.TimeField(null=True, blank=True)
    tuesday_close = models.TimeField(null=True, blank=True)
    wednesday_open = models.TimeField(null=True, blank=True)
    wednesday_close = models.TimeField(null=True, blank=True)
    thursday_open = models.TimeField(null=True, blank=True)
    thursday_close = models.TimeField(null=True, blank=True)
    friday_open = models.TimeField(null=True, blank=True)
    friday_close = models.TimeField(null=True, blank=True)
    saturday_open = models.TimeField(null=True, blank=True)
    saturday_close = models.TimeField(null=True, blank=True)
    sunday_open = models.TimeField(null=True, blank=True)
    sunday_close = models.TimeField(null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    
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
    
    class Meta:
        db_table = 'restaurant'
        ordering = ['-average_rating', '-created_at']
        indexes = [
            models.Index(fields=['owner']),
            models.Index(fields=['category']),
            models.Index(fields=['is_active']),
            models.Index(fields=['-average_rating']),
        ]
    
    def __str__(self):
        return self.name
