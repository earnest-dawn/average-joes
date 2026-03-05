"""
URL Configuration for AverageJoes backend
"""
from django.contrib import admin
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from graphene_django.views import GraphQLView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # GraphQL
    path('graphql/', GraphQLView.as_view(graphiql=True), name='graphql'),
    
    # App URLs
    path('api/auth/', include('apps.user_auth.urls')),
    path('api/users/', include('apps.users.urls')),
    path('api/restaurants/', include('apps.restaurants.urls')),
    path('api/menu-items/', include('apps.menu_items.urls')),
    path('api/combos/', include('apps.combos.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/ratings/', include('apps.ratings.urls')),
    path('api/friends/', include('apps.friends.urls')),
    path('api/carts/', include('apps.carts.urls')),
     path('rio/validate-token', lambda r: JsonResponse({'ok': True})),
        path('', lambda request: redirect('api/docs/', permanent=False)),

# OAuth URLs
    path('auth/', include('social_django.urls', namespace='social')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
