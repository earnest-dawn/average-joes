# apps/menu_items/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.MenuItemViewSet, basename='menu-item')

app_name = 'menu_items'
urlpatterns = router.urls
