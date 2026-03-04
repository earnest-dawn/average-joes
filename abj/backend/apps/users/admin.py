# apps/users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, UserAuditLog, UserSession, FailedLoginAttempt


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar', 'bio', 'date_of_birth', 'phone_number')}),
        ('Address', {'fields': ('street_address', 'city', 'state', 'zip_code', 'country')}),
        ('Account Status', {'fields': ('is_active', 'is_email_verified', 'is_phone_verified', 'email_verified_at', 'phone_verified_at')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'role', 'permissions')}),
        ('Security', {'fields': ('mfa_enabled', 'mfa_method', 'mfa_secret', 'two_factor_required', 'failed_login_attempts', 'account_locked_until')}),
        ('OAuth', {'fields': ('oauth_provider', 'oauth_id')}),
        ('Privacy', {'fields': ('privacy_level', 'receive_notifications', 'receive_marketing_emails')}),
        ('Payment', {'fields': ('has_payment_method', 'stripe_customer_id')}),
        ('Dates', {'fields': ('last_login', 'created_at', 'updated_at', 'deleted_at')}),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'last_login', 'totp_secret')
    search_fields = ('email', 'username')
    list_filter = ('role', 'is_active', 'mfa_enabled', 'created_at')
    ordering = ('-created_at',)


@admin.register(UserAuditLog)
class UserAuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'status', 'ip_address', 'created_at')
    list_filter = ('action', 'status', 'created_at')
    search_fields = ('user__email', 'ip_address')
    readonly_fields = ('id', 'created_at')
    ordering = ('-created_at',)


@admin.register(UserSession)
class UserSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'ip_address', 'is_active', 'created_at', 'expires_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('user__email', 'ip_address')
    readonly_fields = ('id', 'created_at', 'last_activity')
    ordering = ('-last_activity',)


@admin.register(FailedLoginAttempt)
class FailedLoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('email', 'ip_address', 'attempted_at', 'reason')
    list_filter = ('attempted_at',)
    search_fields = ('email', 'ip_address')
    readonly_fields = ('id', 'attempted_at')
    ordering = ('-attempted_at',)
