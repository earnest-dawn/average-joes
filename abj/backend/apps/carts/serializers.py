# apps/carts/serializers.py
from rest_framework import serializers
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'menu_item', 'combo', 'quantity', 'unit_price', 'special_instructions']
        read_only_fields = ['id']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total']
        read_only_fields = ['id', 'user']
    
    def get_total(self, obj):
        return float(obj.get_total())
