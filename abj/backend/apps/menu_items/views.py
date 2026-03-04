# apps/menu_items/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import MenuItem
from .serializers import MenuItemSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.filter(in_stock=True)
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['restaurant', 'category', 'in_stock']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'average_rating']
