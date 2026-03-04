# apps/friends/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.FriendViewSet, basename='friend')

app_name = 'friends'
urlpatterns = router.urls
