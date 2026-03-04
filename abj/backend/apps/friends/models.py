"""
Friends model - Social features
"""
from django.db import models
import uuid


class Friend(models.Model):
    """Friend relationships"""
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('BLOCKED', 'Blocked'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='friend_requests_sent'
    )
    friend = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.CASCADE,
        related_name='friend_requests_received'
    )
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'friend'
        unique_together = ('user', 'friend')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['friend', 'status']),
        ]
    
    def __str__(self):
        return f"{self.user.username} -> {self.friend.username} ({self.status})"
