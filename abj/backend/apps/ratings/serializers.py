# apps/ratings/serializers.py
from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'emoji', 'comment', 'rating_score', 'status', 'created_at', 'helpful_count']
        read_only_fields = ['id', 'status', 'created_at', 'helpful_count']
