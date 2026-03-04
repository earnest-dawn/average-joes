# apps/friends/admin.py
from django.contrib import admin
from .models import Friend


@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'friend__username')
    ordering = ('-created_at',)
