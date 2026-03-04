"""
Rating models - User reviews with emoji support
"""
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Rating(models.Model):
    """Rating model for menu items, combos, and restaurants"""
    
    EMOJI_CHOICES = [
        ('🤯', 'Mind Blown'),
        ('❤', 'Love It'),
        ('🤔', 'Neutral'),
        ('🤮', 'Dislike'),
        ('😡', 'Hate It'),
    ]
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    
    # Generic foreign key to support ratings on different content types
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Rating content
    emoji = models.CharField(max_length=10, choices=EMOJI_CHOICES)
    title = models.CharField(max_length=255, blank=True)
    comment = models.TextField(blank=True)
    
    # Rating score (1-5)
    rating_score = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    
    # Media
    images = ArrayField(models.URLField(), default=list, blank=True)
    
    # Moderation
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    moderation_reason = models.TextField(blank=True)
    approved_by = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_ratings'
    )
    
    # Engagement
    helpful_count = models.IntegerField(default=0)
    unhelpful_count = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'rating'
        ordering = ['-created_at']
        unique_together = ('user', 'content_type', 'object_id')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['content_type', 'object_id']),
            models.Index(fields=['status']),
            models.Index(fields=['-created_at']),
        ]
    
    def __str__(self):
        return f"{self.user} - {self.emoji} - {self.content_type}"


class RatingHelpfulness(models.Model):
    """Track whether users found a rating helpful"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rating = models.ForeignKey(Rating, on_delete=models.CASCADE, related_name='helpfulness')
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    is_helpful = models.BooleanField()  # True = helpful, False = unhelpful
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'rating_helpfulness'
        unique_together = ('rating', 'user')
    
    def __str__(self):
        return f"{self.user} marked {self.rating} as {'helpful' if self.is_helpful else 'unhelpful'}"
