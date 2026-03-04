# apps/auth/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = 'auth'

urlpatterns = [
    # Authentication
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    
    # MFA
    path('mfa/setup/', views.MFASetupView.as_view(), name='mfa_setup'),
    path('mfa/verify/', views.MFAVerifyView.as_view(), name='mfa_verify'),
    path('mfa/backup-codes/', views.GenerateBackupCodesView.as_view(), name='backup_codes'),
    
    # OAuth
    path('oauth/google/', views.GoogleOAuthView.as_view(), name='google_oauth'),
    path('oauth/github/', views.GithubOAuthView.as_view(), name='github_oauth'),
    path('oauth/facebook/', views.FacebookOAuthView.as_view(), name='facebook_oauth'),
    
    # Password
    path('password/change/', views.ChangePasswordView.as_view(), name='change_password'),
    path('password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('password/reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # Email verification
    path('email/verify/', views.VerifyEmailView.as_view(), name='verify_email'),
    path('email/resend/', views.ResendVerificationView.as_view(), name='resend_verification'),
]
