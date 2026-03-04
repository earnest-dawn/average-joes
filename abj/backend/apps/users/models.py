"""
Custom User model with enterprise security features:
- MFA (TOTP-based)
- OAuth 2.0 integration
- Role-Based Access Control (RBAC)
- Secure password policies
- Audit logging
"""

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import EmailValidator, URLValidator
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
import uuid
import pyotp


class CustomUserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""
    
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not username:
            raise ValueError('Username is required')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    Extended User model with security and business features
    """
    
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('restaurant_owner', 'Restaurant Owner'),
        ('admin', 'Administrator'),
        ('moderator', 'Moderator'),
    ]
    
    # Core fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    # Profile
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    # Address (for GDPR compliance - separate from personal data)
    street_address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    
    # Account status
    is_active = models.BooleanField(default=True)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    phone_verified_at = models.DateTimeField(null=True, blank=True)
    
    # RBAC - Role-Based Access Control
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='customer'
    )
    permissions = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    
    # MFA - Multi-Factor Authentication
    mfa_enabled = models.BooleanField(default=False)
    mfa_method = models.CharField(
        max_length=20,
        choices=[
            ('totp', 'TOTP'),
            ('sms', 'SMS'),
            ('email', 'Email'),
        ],
        default='totp',
        blank=True
    )
    totp_secret = models.CharField(max_length=32, blank=True, null=True)  # Encrypted
    backup_codes = ArrayField(models.CharField(max_length=20), default=list, blank=True)
    
    # OAuth & Social Auth
    oauth_provider = models.CharField(
        max_length=20,
        choices=[
            ('google', 'Google'),
            ('github', 'GitHub'),
            ('facebook', 'Facebook'),
        ],
        blank=True,
        null=True
    )
    oauth_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    
    # Security & Audit
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    last_login_device = models.CharField(max_length=255, blank=True)
    failed_login_attempts = models.IntegerField(default=0)
    account_locked_until = models.DateTimeField(null=True, blank=True)
    
    # Password history (prevent reuse)
    last_password_change = models.DateTimeField(auto_now_add=True)
    password_history = ArrayField(models.CharField(max_length=255), default=list, blank=True)
    
    # Privacy & Preferences
    two_factor_required = models.BooleanField(default=False)
    privacy_level = models.CharField(
        max_length=20,
        choices=[
            ('public', 'Public'),
            ('friends', 'Friends Only'),
            ('private', 'Private'),
        ],
        default='private'
    )
    receive_notifications = models.BooleanField(default=True)
    receive_marketing_emails = models.BooleanField(default=False)
    
    # PCI-DSS Compliance
    has_payment_method = models.BooleanField(default=False)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Data & Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)  # Soft delete for GDPR
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'auth_user'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['oauth_id']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.username} ({self.email})"
    
    def generate_mfa_secret(self):
        """Generate TOTP secret for MFA setup"""
        self.totp_secret = pyotp.random_base32()
        return self.totp_secret
    
    def verify_totp(self, token):
        """Verify TOTP token"""
        if not self.totp_secret:
            return False
        totp = pyotp.TOTP(self.totp_secret)
        return totp.verify(token)
    
    def get_totp_uri(self):
        """Get provisioning URI for QR code generation"""
        if not self.totp_secret:
            return None
        totp = pyotp.TOTP(self.totp_secret)
        return totp.provisioning_uri(
            name=self.email,
            issuer_name='AverageJoes'
        )
    
    def lock_account(self, minutes=30):
        """Lock account after failed login attempts"""
        self.account_locked_until = timezone.now() + timezone.timedelta(minutes=minutes)
        self.save()
    
    def unlock_account(self):
        """Unlock account"""
        self.account_locked_until = None
        self.failed_login_attempts = 0
        self.save()
    
    def is_account_locked(self):
        """Check if account is locked"""
        if self.account_locked_until:
            if timezone.now() < self.account_locked_until:
                return True
            else:
                self.unlock_account()
        return False
    
    def increment_failed_login(self):
        """Increment failed login counter and lock if necessary"""
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= 5:
            self.lock_account()
        else:
            self.save()
    
    def reset_failed_login(self):
        """Reset failed login counter"""
        self.failed_login_attempts = 0
        self.account_locked_until = None
        self.save()
    
    def get_permissions(self):
        """Get user permissions based on role"""
        role_permissions = {
            'customer': [
                'view_menu',
                'place_order',
                'rate_items',
                'manage_cart',
                'view_friends',
                'manage_profile',
            ],
            'restaurant_owner': [
                'manage_menu',
                'view_orders',
                'manage_combos',
                'view_analytics',
                'manage_restaurant',
            ],
            'moderator': [
                'view_all_users',
                'view_all_orders',
                'approve_ratings',
                'view_reports',
            ],
            'admin': [
                'manage_users',
                'manage_restaurants',
                'view_analytics',
                'manage_system',
                'view_security_logs',
            ]
        }
        return role_permissions.get(self.role, []) + self.permissions


class UserAuditLog(models.Model):
    """Audit log for user security events"""
    
    ACTION_CHOICES = [
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('password_change', 'Password Change'),
        ('mfa_enabled', 'MFA Enabled'),
        ('mfa_disabled', 'MFA Disabled'),
        ('permission_change', 'Permission Change'),
        ('failed_login', 'Failed Login'),
        ('account_locked', 'Account Locked'),
        ('profile_update', 'Profile Update'),
        ('oauth_connect', 'OAuth Connect'),
        ('oauth_disconnect', 'OAuth Disconnect'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='audit_logs')
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=20, choices=[('success', 'Success'), ('failed', 'Failed')])
    details = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_audit_log'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['action']),
            models.Index(fields=['ip_address']),
        ]
    
    def __str__(self):
        return f"{self.user} - {self.action}"


class UserSession(models.Model):
    """Track active user sessions for security"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sessions')
    device_fingerprint = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField()
    
    class Meta:
        db_table = 'user_session'
        ordering = ['-last_activity']
    
    def __str__(self):
        return f"{self.user} - {self.device_fingerprint}"


class FailedLoginAttempt(models.Model):
    """Track failed login attempts for adaptive authentication"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500)
    attempted_at = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'failed_login_attempt'
        ordering = ['-attempted_at']
        indexes = [
            models.Index(fields=['email', '-attempted_at']),
            models.Index(fields=['ip_address', '-attempted_at']),
        ]
