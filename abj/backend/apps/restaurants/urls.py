# apps/restaurants/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.RestaurantViewSet, basename='restaurant')

app_name = 'restaurants'
urlpatterns = router.urls
