# apps/restaurants/serializers.py
from rest_framework import serializers
from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'category', 'phone_number', 'email', 'website', 'average_rating', 'is_verified', 'created_at']
        read_only_fields = ['id', 'created_at']
