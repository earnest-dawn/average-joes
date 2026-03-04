# apps/menu_items/serializers.py
from rest_framework import serializers
from .models import MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'restaurant', 'name', 'description', 'category', 'price', 'discount_price', 'calories', 'ingredients', 'in_stock', 'average_rating', 'created_at']
        read_only_fields = ['id', 'created_at']
