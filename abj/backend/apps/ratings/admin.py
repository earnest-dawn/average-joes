# apps/ratings/admin.py
from django.contrib import admin
from .models import Rating, RatingHelpfulness


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'emoji', 'rating_score', 'status', 'created_at')
    list_filter = ('emoji', 'status', 'created_at')
    search_fields = ('user__username', 'comment')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)


@admin.register(RatingHelpfulness)
class RatingHelpfulnessAdmin(admin.ModelAdmin):
    list_display = ('rating', 'user', 'is_helpful')
    list_filter = ('is_helpful', 'created_at')
    readonly_fields = ('created_at',)
