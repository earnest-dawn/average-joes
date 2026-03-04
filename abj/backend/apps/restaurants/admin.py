# apps/restaurants/admin.py
from django.contrib import admin
from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'owner', 'is_verified', 'average_rating', 'created_at')
    list_filter = ('category', 'is_verified', 'is_active')
    search_fields = ('name', 'owner__username')
    ordering = ('-created_at',)
