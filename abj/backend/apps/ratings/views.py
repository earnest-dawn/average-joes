# apps/ratings/views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Rating
from .serializers import RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.filter(status='APPROVED')
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['emoji', 'status']
    search_fields = ['comment', 'user__username']
    ordering_fields = ['created_at', 'helpful_count']
    
    @action(detail=True, methods=['post'])
    def mark_helpful(self, request, pk=None):
        """Mark rating as helpful"""
        rating = self.get_object()
        rating.helpful_count += 1
        rating.save()
        return Response({'helpful_count': rating.helpful_count})
