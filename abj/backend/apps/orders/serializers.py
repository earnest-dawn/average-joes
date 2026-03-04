# apps/orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'combo', 'quantity', 'price_at_purchase', 'total']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'customer', 'restaurant', 'status', 'payment_status', 'total_price', 'created_at', 'completed_at', 'order_items']
        read_only_fields = ['id', 'order_number', 'created_at', 'completed_at']
