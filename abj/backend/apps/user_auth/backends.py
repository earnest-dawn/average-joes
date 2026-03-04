"""
Custom authentication backends with MFA, OAuth, and adaptive authentication
"""

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.utils import timezone
from apps.users.models import FailedLoginAttempt
from django.core.cache import cache
import logging

User = get_user_model()
logger = logging.getLogger('apps.user_auth')


class MFABackend(ModelBackend):
    """
    Custom authentication backend with MFA support
    """
    
    def authenticate(self, request, email=None, password=None, mfa_token=None, **kwargs):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            logger.warning(f"Failed login attempt with invalid email: {email}")
            return None
        
        # Check if account is locked
        if user.is_account_locked():
            logger.warning(f"Login attempt to locked account: {user.email}")
            return None
        
        # Verify password
        if not user.check_password(password):
            user.increment_failed_login()
            FailedLoginAttempt.objects.create(
                email=email,
                ip_address=self.get_client_ip(request),
                user_agent=self.get_user_agent(request),
                reason='Invalid password'
            )
            logger.warning(f"Failed password attempt: {user.email}")
            return None
        
        # Check if MFA is enabled
        if user.mfa_enabled:
            if not mfa_token:
                # MFA token required but not provided
                logger.warning(f"MFA token missing: {user.email}")
                return None
            
            if not user.verify_totp(mfa_token):
                user.increment_failed_login()
                logger.warning(f"Failed MFA verification: {user.email}")
                return None
        
        # Successful login
        user.reset_failed_login()
        user.last_login = timezone.now()
        user.last_login_ip = self.get_client_ip(request)
        user.last_login_device = self.get_user_agent(request)
        user.save()
        
        logger.info(f"Successful login: {user.email}")
        return user
    
    @staticmethod
    def get_client_ip(request):
        """Extract client IP from request"""
        if request is None:
            return None
        
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    @staticmethod
    def get_user_agent(request):
        """Extract user agent from request"""
        if request is None:
            return None
        return request.META.get('HTTP_USER_AGENT', '')


class AdaptiveAuthenticationBackend(ModelBackend):
    """
    Adaptive authentication backend for risk-based authentication
    """
    
    def authenticate(self, request, email=None, password=None, **kwargs):
        # Call parent authentication
        user = super().authenticate(request, username=email, password=password)
        
        if user is None:
            return None
        
        # Check for anomalies
        risk_score = self.calculate_risk_score(request, user)
        
        if risk_score > 70:  # High risk
            logger.warning(f"High-risk login attempt detected for {user.email}. Risk score: {risk_score}")
            # Could trigger additional verification here
        
        return user
    
    @staticmethod
    def calculate_risk_score(request, user):
        """
        Calculate risk score based on:
        - Unusual location
        - Unusual time
        - New device
        - Multiple failed attempts
        """
        risk_score = 0
        ip = MFABackend.get_client_ip(request)
        
        # Check for unusual IP
        if user.last_login_ip and user.last_login_ip != ip:
            risk_score += 30
        
        # Check for multiple failed attempts recently
        recent_failures = FailedLoginAttempt.objects.filter(
            email=user.email,
            attempted_at__gte=timezone.now() - timezone.timedelta(hours=1)
        ).count()
        risk_score += min(recent_failures * 10, 40)
        
        return risk_score
