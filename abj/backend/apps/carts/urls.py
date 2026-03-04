# apps/carts/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'items', views.CartItemViewSet, basename='cart-item')

app_name = 'carts'
urlpatterns = [
    path('', views.CartView.as_view(), name='cart'),
] + router.urls
