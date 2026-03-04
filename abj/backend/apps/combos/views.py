# apps/combos/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Combo
from .serializers import ComboSerializer


class ComboViewSet(viewsets.ModelViewSet):
    queryset = Combo.objects.filter(is_available=True)
    serializer_class = ComboSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['restaurant']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'price', 'average_rating']
