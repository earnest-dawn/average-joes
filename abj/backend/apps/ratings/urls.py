# apps/ratings/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.RatingViewSet, basename='rating')

app_name = 'ratings'
urlpatterns = router.urls
