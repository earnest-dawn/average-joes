# apps/menu_items/admin.py
from django.contrib import admin
from .models import MenuItem


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'category', 'price', 'in_stock', 'average_rating')
    list_filter = ('category', 'in_stock', 'is_vegetarian', 'is_vegan', 'created_at')
    search_fields = ('name', 'restaurant__name')
    ordering = ('restaurant', 'name')
