# apps/combos/admin.py
from django.contrib import admin
from .models import Combo


@admin.register(Combo)
class ComboAdmin(admin.ModelAdmin):
    list_display = ('title', 'restaurant', 'price', 'is_available', 'average_rating')
    list_filter = ('is_available', 'created_at')
    search_fields = ('title', 'restaurant__name')
    ordering = ('restaurant', 'title')
