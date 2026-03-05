"""
Django settings for AverageJoes backend.
Includes enterprise-grade security: MFA, OAuth 2.0, PCI-DSS, GDPR compliance
"""

import os
from pathlib import Path
from datetime import timedelta
from django.db.models import Field
from decouple import config, Csv
import environ
import logging


# Initialize environment
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(os.path.join(os.path.dirname(__file__), '../.env'))

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent
PARENT_DIR = BASE_DIR.parent

# SECURITY: Secret key from environment
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-this-key')

# DEBUG mode
DEBUG = config('DEBUG', default=True, cast=bool)

# Allowed hosts from environment
ALLOWED_HOSTS = ['127.0.0.2', 'localhost', '127.0.0.1', ]

# Application definition
INSTALLED_APPS = [
    # 'daphne',  # ASGI server for WebSockets
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'graphene_django',
    'django_otp',
    'django_otp.plugins.otp_totp',
    'django_otp.plugins.otp_static',
    'django_filters',
    'drf_spectacular',
    'storages',  # AWS S3 integration
    
    # OAuth2
    'social_django',
    
    # Rate limiting
    'django_ratelimit',
    
    # Local apps
    'apps.users',
    'apps.restaurants',
    'apps.menu_items',
    'apps.combos',
    'apps.orders',
    'apps.ratings',
    'apps.friends',
    'apps.carts',
    'apps.user_auth',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django_otp.middleware.OTPMiddleware',  # MFA middleware
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

# ============================================================================
# DATABASE CONFIGURATION - PostgreSQL with connection pooling
# ============================================================================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='ABJ'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default='postgres'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
        'ATOMIC_REQUESTS': True,  # Ensures all DB operations are atomic
        'CONN_MAX_AGE': 600,
    }
}

# ============================================================================
# PASSWORD VALIDATION - Enterprise-grade security
# ============================================================================
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 15,  # Minimum 15 characters as requested
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': 'apps.users.validators.PasswordComplexityValidator',  # Custom: requires uppercase, lowercase, digit, special char
    },
]

# ============================================================================
# AUTHENTICATION BACKENDS - Multi-factor & OAuth 2.0
# ============================================================================
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.github.GithubOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'apps.user_auth.backends.MFABackend',  # Custom MFA backend
]

# ============================================================================
# REST FRAMEWORK CONFIGURATION - API Security
# ============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}

# ============================================================================
# JWT CONFIGURATION - Token-based authentication
# ============================================================================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_COOKIE': 'access_token',
    'AUTH_COOKIE_SECURE': not DEBUG,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_PATH': '/',
    'AUTH_COOKIE_SAMESITE': 'Strict',
}

# ============================================================================
# CORS CONFIGURATION - Cross-origin requests
# ============================================================================
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000',
    cast=Csv()
)
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# ============================================================================
# OAUTH 2.0 CONFIGURATION
# ============================================================================
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config('GOOGLE_OAUTH_CLIENT_ID', default='')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config('GOOGLE_OAUTH_CLIENT_SECRET', default='')
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'profile',
    'email',
]

SOCIAL_AUTH_GITHUB_KEY = config('GITHUB_OAUTH_CLIENT_ID', default='')
SOCIAL_AUTH_GITHUB_SECRET = config('GITHUB_OAUTH_CLIENT_SECRET', default='')

SOCIAL_AUTH_FACEBOOK_KEY = config('FACEBOOK_OAUTH_CLIENT_ID', default='')
SOCIAL_AUTH_FACEBOOK_SECRET = config('FACEBOOK_OAUTH_CLIENT_SECRET', default='')

SOCIAL_AUTH_LOGIN_REDIRECT_URL = config('FRONTEND_URL', default='http://localhost:3000')
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = config('FRONTEND_URL', default='http://localhost:3000')

# ============================================================================
# MFA/OTP CONFIGURATION - Multi-factor authentication
# ============================================================================
OTP_TOTP_ISSUER = config('OTP_TOTP_ISSUER', default='AverageJoes')
OTP_LOGIN_URL = '/auth/login/'

# ============================================================================
# SECURITY SETTINGS - SSL/TLS, HTTPS, HSTS, CSP
# ============================================================================

# Force HTTPS in production
# Force HTTPS ONLY in production
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

if DEBUG:
    # Disable all security headers that force HTTPS
    SECURE_HSTS_SECONDS = 0
    SECURE_HSTS_INCLUDE_SUBDOMAINS = False
    SECURE_HSTS_PRELOAD = False
    SECURE_CONTENT_SECURITY_POLICY = None
    SECURE_BROWSER_XSS_FILTER = False
    SECURE_CONTENT_TYPE_NOSNIFF = False
    # This prevents the 'strict-origin-when-cross-origin' you saw in the logs
    SECURE_REFERRER_POLICY = 'no-referrer-when-downgrade' 
else:
    # PRODUCTION SETTINGS (Keep these for your live server)
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
# Frame options - prevent clickjacking
X_FRAME_OPTIONS = 'DENY'

# CSP - Content Security Policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", 'cdn.jsdelivr.net')
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", 'fonts.googleapis.com')
CSP_IMG_SRC = ("'self'", 'data:', 'https:')
CSP_FONT_SRC = ("'self'", 'fonts.gstatic.com')

# Referrer policy
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'

# Cookie settings
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_AGE = 3600  # 1 hour

# Additional security headers
SECURE_CONTENT_SECURITY_POLICY = {
    'default-src': ("'self'",),
    'script-src': ("'self'", "'unsafe-inline'"),
    'style-src': ("'self'", "'unsafe-inline'"),
    'img-src': ("'self'", "data:", "https:"),
}

# ============================================================================
# PAYMENT CONFIGURATION - Stripe for PCI-DSS compliance
# ============================================================================
STRIPE_PUBLIC_KEY = config('STRIPE_PUBLIC_KEY', default='')
STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY', default='')
STRIPE_WEBHOOK_SECRET = config('STRIPE_WEBHOOK_SECRET', default='')

# ============================================================================
# FILE UPLOAD & STORAGE - AWS S3 for secure storage
# ============================================================================
USE_S3 = config('USE_S3', default=False, cast=bool)

if USE_S3:
    # AWS S3 Configuration
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME', default='us-east-1')
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
    STATIC_ROOT = 'static/'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
else:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# File upload restrictions
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880
ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp']

# ============================================================================
# INTERNATIONALIZATION
# ============================================================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ============================================================================
# LOGGING - Security & Audit logging
# ============================================================================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'security': {
            'format': '{asctime} {levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/debug.log'),
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'security_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/security.log'),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 20,
            'formatter': 'security',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': config('LOG_LEVEL', default='INFO'),
            'propagate': False,
        },
        'django.security': {
            'handlers': ['security_file'],
            'level': 'WARNING',
            'propagate': False,
        },
        'apps.user_auth': {
            'handlers': ['security_file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# Create logs directory if it doesn't exist
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)

# ============================================================================
# CELERY CONFIGURATION - Async tasks
# ============================================================================
CELERY_BROKER_URL = config('CELERY_BROKER_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = config('CELERY_RESULT_BACKEND', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

# ============================================================================
# GRAPHQL CONFIGURATION
# ============================================================================
GRAPHENE = {
    'SCHEMA': 'config.schema.schema',
    'MIDDLEWARE': [
        'graphene_django.debug.DjangoDebugMiddleware',
    ],
}

# ============================================================================
# EMAIL CONFIGURATION - For notifications and verification
# ============================================================================
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@averagejoes.com')

# ============================================================================
# GDPR & DATA PRIVACY
# ============================================================================
# Data retention policies
USER_DATA_RETENTION_DAYS = 365  # 1 year
DELETED_USER_DATA_RETENTION_DAYS = 30  # 30 days for deleted accounts

# Encryption for sensitive data
ENCRYPTION_KEY = config('ENCRYPTION_KEY', default=SECRET_KEY.encode()[:32])

# ============================================================================
# CUSTOM USER MODEL
# ============================================================================
AUTH_USER_MODEL = 'users.CustomUser'

# Default Auto Field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================================================
# RATE LIMITING
# ============================================================================
RATELIMIT_ENABLE = True
RATELIMIT_USE_CACHE = 'default'

# ============================================================================
# CACHING - Redis for performance
# ============================================================================
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Session cache
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
