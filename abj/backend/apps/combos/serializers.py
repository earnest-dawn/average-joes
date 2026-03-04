# apps/combos/serializers.py
from rest_framework import serializers
from .models import Combo


class ComboSerializer(serializers.ModelSerializer):
    class Meta:
        model = Combo
        fields = ['id', 'restaurant', 'title', 'description', 'price', 'original_price', 'menu_items', 'is_available', 'average_rating', 'created_at']
        read_only_fields = ['id', 'created_at']
