# apps/carts/admin.py
from django.contrib import admin
from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username',)
    ordering = ('-updated_at',)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'menu_item', 'combo', 'quantity', 'unit_price')
    list_filter = ('added_at',)
    search_fields = ('cart__user__username', 'menu_item__name', 'combo__title')
