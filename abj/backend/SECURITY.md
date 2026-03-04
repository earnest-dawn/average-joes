# Security Implementation Guide - AverageJoes Django Backend

Enterprise-grade security for e-commerce food ordering platform with financial transactions.

## 1. Authentication & MFA

### 1.1 TOTP-Based MFA (Time-based One-Time Password)

**Setup Flow:**
```python
# User initiates MFA setup
POST /api/auth/mfa/setup/
Response:
{
  "secret": "JBSWY3DPEHPK3PXP",  // Base32 encoded
  "qr_code": "data:image/png;base64,...",  // QR code image
  "message": "Scan with authenticator app"
}

# User scans QR code in Google Authenticator, Authy, etc.
# User verifies by sending 6-digit code

PUT /api/auth/mfa/setup/
{
  "token": "123456"
}
Response:
{
  "backup_codes": ["ABC123", "DEF456", ...],  // 10 backup codes
  "message": "MFA enabled"
}
```

**Implementation:** [apps/users/models.py](backend/apps/users/models.py#L95)
- Uses PyOTP library for TOTP generation
- Secrets stored encrypted in database
- Backup codes for account recovery
- Time window: ±30 seconds

### 1.2 OAuth 2.0 Integration

**Supported Providers:**
- Google OAuth 2.0
- GitHub OAuth
- Facebook OAuth

**Flow:**
```
1. User clicks "Login with Google"
2. Redirect to: https://accounts.google.com/o/oauth2/v2/auth?client_id=...
3. User authorizes
4. OAuth callback: /auth/oauth/google/?code=...&state=...
5. Backend exchanges code for access token
6. Backend fetches user info from Google API
7. Create or update local user
8. Return JWT token to frontend
```

**Configuration:** [backend/config/settings.py](backend/config/settings.py#L177)

```python
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = 'YOUR_GOOGLE_CLIENT_ID'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET'
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['profile', 'email']
```

### 1.3 JWT Token Management

**Token Structure:**
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { 
  "user_id": "uuid",
  "username": "john_doe",
  "iat": 1234567890,
  "exp": 1234571490  // 1 hour expiry
}
Signature: HMACSHA256(header + payload, SECRET_KEY)
```

**Token Lifecycle:**
```
Access Token (1 hour):
- Used for API requests
- Stored in Authorization header
- Automatically refreshed

Refresh Token (7 days):
- Used to get new access token
- Stored in secure HTTP-only cookie
- Rotated on each use
```

**Endpoints:**
```python
POST /api/token/
{ "email": "user@example.com", "password": "..." }
→ Returns: { "access": "...", "refresh": "..." }

POST /api/token/refresh/
{ "refresh": "..." }
→ Returns: { "access": "..." }
```

### 1.4 Adaptive Authentication

Risk-based authentication in [apps/auth/backends.py](backend/apps/auth/backends.py#L48)

**Risk Scoring:**
- New IP address: +30 points
- Multiple failed attempts (last hour): +10 points per attempt
- Unusual login time: +15 points (configurable)
- New device fingerprint: +20 points

**Triggers:**
- Risk Score > 70: Require additional verification (MFA, security question)
- Risk Score > 90: Block login, send verification email
- 5 failed attempts: Lock account for 30 minutes

## 2. Password Security

### 2.1 Password Requirements

**Enforced by:** [apps/users/validators.py](backend/apps/users/validators.py)

```
Minimum length: 15 characters (NIST SP 800-63B compliant)
Must include:
  - At least 1 uppercase letter (A-Z)
  - At least 1 lowercase letter (a-z)
  - At least 1 digit (0-9)
  - At least 1 special character (!@#$%^&*...)

Examples:
✓ MyPassword123!@#
✓ SecurePass2024$
✗ password123  (no uppercase, special)
✗ Password1  (less than 15 chars)
```

### 2.2 Password Hashing

**Algorithm:** Bcrypt with automatic salt

```python
# Settings:
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',  # Latest
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]

# Hashing process:
plain_password = "MyPassword123!@#"
salt = random_bytes(16)
hash = bcrypt(plain_password + salt, rounds=12)
storage = f"bcrypt_sha256$12${salt}${hash}"

# Verification:
provided = "MyPassword123!@#"
matches = verify(provided, stored_hash)
```

### 2.3 Password History

Prevents reuse of recent passwords:

```python
user.password_history = [
  "bcrypt_sha256$12$...",  # Last password
  "bcrypt_sha256$12$...",  # Previous password
  "bcrypt_sha256$12$...",  # 3 passwords ago
]

# When changing password:
new_password = "NewPassword456!@#"
if verify(new_password, any(user.password_history)):
    raise ValidationError("Cannot reuse recent passwords")
```

### 2.4 Password Expiration & Reset

```python
REQUIRED_PASSWORD_CHANGE_DAYS = 90

# Endpoint: POST /api/auth/password/change/
{
  "old_password": "...",
  "new_password": "...",
  "new_password_confirm": "..."
}

# Endpoint: POST /api/auth/password/reset/
{
  "email": "user@example.com"
}
# Sends email with link: /password-reset/<token>/
```

## 3. HTTPS/TLS/SSL Configuration

### 3.1 HTTPS Enforcement

```python
# settings.py
SECURE_SSL_REDIRECT = True  # Redirect all HTTP to HTTPS
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True  # Include in HSTS preload list
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name api.averagejoes.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.averagejoes.com;
    
    ssl_certificate /etc/letsencrypt/live/api.averagejoes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.averagejoes.com/privkey.pem;
    
    # TLS 1.2+ only
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}
```

### 3.2 Security Headers

```python
# Implemented in settings.py

SECURE_CONTENT_SECURITY_POLICY = {
    'default-src': ("'self'",),
    'script-src': ("'self'", "'unsafe-inline'"),
    'style-src': ("'self'", "'unsafe-inline'"),
    'img-src': ("'self'", "data:", "https:"),
}

# Results in HTTP headers:
# Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
```

## 4. PCI-DSS Compliance

### 4.1 Payment Processing

**NO card data stored locally:**

```python
# Order model - payment details
class Order(models.Model):
    # ✓ Safe to store
    transaction_id = models.CharField(max_length=255)  # Stripe charge ID
    stripe_intent_id = models.CharField(max_length=255)  # Payment Intent
    payment_status = models.CharField(...)
    
    # ✗ NEVER store locally
    # card_number: str
    # cvv: str
    # expiry: str
```

**Stripe Integration:**
```python
# Backend handles all sensitive data
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_payment(order, amount, source_token):
    """
    source_token is a Stripe token from client
    Never receive raw card data
    """
    intent = stripe.PaymentIntent.create(
        amount=int(amount * 100),  # Cents
        currency='usd',
        customer=user.stripe_customer_id,
        payment_method=source_token,
        off_session=True
    )
    
    order.stripe_intent_id = intent.id
    order.transaction_id = intent.charges.data[0].id if intent.charges else None
    order.save()
    
    return intent
```

**Frontend (tokenization):**
```javascript
// Frontend never sees card data
// Stripe.js handles tokenization
const stripe = Stripe('pk_live_...');
const cardElement = stripe.elements().create('card');

async function processPayment(amount) {
  // Tokenize card
  const { token } = await stripe.createToken(cardElement);
  
  // Send token to backend, not card data
  const response = await fetch('/api/orders/create/', {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
      source_token: token.id  // Stripe token, not card
    })
  });
}
```

### 4.2 Secure Transaction Storage

```python
# Order audit trail
class OrderAuditLog(models.Model):
    order = ForeignKey(Order)
    action = CharField()  # 'CREATED', 'PAYMENT_SUCCESS', etc.
    amount = DecimalField()  # Store amount, not card details
    payment_method_type = CharField()  # 'CARD', 'WALLET'
    timestamp = DateTimeField(auto_now_add=True)
    
    # Immutable audit log
    class Meta:
        db_table = 'order_audit_log'
        # Never deleted, only inserted
```

### 4.3 Regular Compliance Audits

```bash
# Monthly PCI-DSS checklist:
1. Verify no card data in logs
2. Review payment gateway logs
3. Check SSL certificates validity
4. Audit access controls
5. Scan for vulnerabilities
6. Update PCI-DSS compliance report
```

## 5. GDPR Compliance

### 5.1 Data Handling

**Personal Data Stored:**
```python
class CustomUser(AbstractUser):
    # Personal data (GDPR regulated)
    email = EmailField()
    phone_number = CharField()
    street_address = CharField()
    city = CharField()
    date_of_birth = DateField()
    avatar = ImageField()
    
    # Data retention
    created_at = DateTimeField(auto_now_add=True)
    deleted_at = DateTimeField(null=True)  # Soft delete
```

**Data Categories:**
- **Essential**: Email, username, password (for auth)
- **Preference**: Phone, address (for orders)
- **Optional**: Avatar, bio, birthday

### 5.2 User Consent

```python
class UserConsent(models.Model):
    """Track user consents"""
    user = ForeignKey(CustomUser)
    
    CONSENT_TYPES = [
        ('MARKETING', 'Marketing emails'),
        ('ANALYTICS', 'Analytics tracking'),
        ('DATA_PROCESSING', 'Data processing'),
    ]
    
    consent_type = CharField(choices=CONSENT_TYPES)
    given_at = DateTimeField(auto_now_add=True)
    is_given = BooleanField()
    
    class Meta:
        unique_together = ('user', 'consent_type')
```

### 5.3 Right to Be Forgotten (Data Deletion)

**Endpoint:** `DELETE /api/users/{id}/`

```python
class DeleteAccountView(APIView):
    def delete(self, request):
        user = request.user
        
        # Anonymous old orders
        user.orders.update(customer=None)
        
        # Delete personal data
        user.email = f"deleted-{uuid4()}@example.com"
        user.phone_number = ""
        user.street_address = ""
        user.avatar.delete()
        user.deleted_at = timezone.now()
        user.is_active = False
        user.save()
        
        # Schedule final deletion after 30 days
        schedule_account_purge(user, days=30)
        
        return Response({'status': 'account scheduled for deletion'})
```

**Data Purge** (after 30 days):
```python
def purge_deleted_accounts():
    """Run daily via Celery task"""
    from django.utils import timezone
    from datetime import timedelta
    
    cutoff = timezone.now() - timedelta(days=30)
    deleted_users = CustomUser.objects.filter(
        deleted_at__lt=cutoff,
        is_active=False
    )
    
    for user in deleted_users:
        # Anonymize remaining data
        user.username = f"user-{user.id}"
        user.first_name = ""
        user.last_name = ""
        user.save()
        
        # Actually delete sensitive records
        user.audit_logs.all().delete()
        user.sessions.all().delete()
```

### 5.4 Data Export (Right of Portability)

**Endpoint:** `GET /api/users/export/`

```python
class DataExportView(APIView):
    def get(self, request):
        """Export user data as JSON"""
        user = request.user
        
        data = {
            'user': UserSerializer(user).data,
            'orders': list(user.orders.values()),
            'ratings': list(user.ratings.values()),
            'friends': list(user.friend_requests_sent.values()),
        }
        
        response = HttpResponse(json.dumps(data), content_type='application/json')
        response['Content-Disposition'] = f'attachment; filename="account-{user.username}.json"'
        
        return response
```

## 6. RBAC (Role-Based Access Control)

### 6.1 User Roles

```python
ROLE_CHOICES = [
    ('customer', 'Regular customer'),
    ('restaurant_owner', 'Restaurant owner'),
    ('moderator', 'Content moderator'),
    ('admin', 'System administrator'),
]

# Role permissions mapping
ROLE_PERMISSIONS = {
    'customer': [
        'view_menu',
        'place_order',
        'rate_items',
        'manage_cart',
    ],
    'restaurant_owner': [
        'manage_restaurant',
        'manage_menu',
        'view_orders',
        'view_analytics',
    ],
    'moderator': [
        'approve_ratings',
        'view_reports',
        'manage_users',
    ],
    'admin': [
        'manage_system',
        'view_security_logs',
        'manage_payments',
    ],
}
```

### 6.2 Permission Checks

```python
class PermissionRequiredMixin:
    required_permission = None
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise PermissionDenied()
        
        if self.required_permission:
            if self.required_permission not in request.user.get_permissions():
                raise PermissionDenied()
        
        return super().dispatch(request, *args, **kwargs)


class RestaurantViewSet(PermissionRequiredMixin, viewsets.ModelViewSet):
    required_permission = 'manage_restaurant'
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Restaurant.objects.all()
        return Restaurant.objects.filter(owner=user)
```

## 7. Rate Limiting

### 7.1 API Rate Limiting

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',      # Anonymous users
        'user': '1000/hour',     # Authenticated users
        'auth_login': '5/minute', # Login attempts
        'api_create': '100/hour', # Create operations
    }
}
```

### 7.2 Brute Force Protection

```python
class LoginRateLimitMiddleware:
    def __call__(self, request):
        if request.path == '/api/auth/login/' and request.method == 'POST':
            email = request.POST.get('email', '')
            
            # Check rate limit
            cache_key = f"login_attempts:{email}"
            attempts = cache.get(cache_key, 0)
            
            if attempts >= 5:
                # Account locked
                raise TooManyLoginAttempts()
            
            cache.set(cache_key, attempts + 1, timeout=1800)  # 30 min
        
        return self.get_response(request)
```

## 8. API Security

### 8.1 Input Validation

```python
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'total_price']
        read_only_fields = ['id', 'customer']  # Prevent tampering
    
    def validate_total_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        if value > 99999.99:
            raise serializers.ValidationError("Price exceeds limit")
        return value
    
    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Order must contain items")
        if len(items) > 100:
            raise serializers.ValidationError("Too many items in order")
        return items
```

### 8.2 SQL Injection Prevention

```python
# ✓ Safe - uses parameterized queries (Django ORM)
User.objects.filter(email=request.GET['email'])

# ✗ Unsafe - never do this
User.objects.raw(f"SELECT * FROM auth_user WHERE email = '{request.GET['email']}'")

# ✓ Safe with raw SQL
User.objects.raw("SELECT * FROM auth_user WHERE email = %s", [request.GET['email']])
```

### 8.3 CSRF Protection

```python
# Automatically enabled in Django
# All POST/PUT/DELETE requests must include CSRF token

# From template:
<form method="post">
  {% csrf_token %}
  ...
</form>

# From JavaScript:
fetch('/api/orders/', {
  method: 'POST',
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),  // From cookie
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
```

## 9. Audit Logging

### 9.1 Security Events

```python
class UserAuditLog(models.Model):
    ACTION_CHOICES = [
        ('LOGIN', 'Login'),
        ('LOGOUT', 'Logout'),
        ('PASSWORD_CHANGE', 'Password change'),
        ('MFA_ENABLED', 'MFA enabled'),
        ('OAUTH_CONNECT', 'OAuth connected'),
        ('ORDER_CREATED', 'Order created'),
        ('PAYMENT_SUCCESS', 'Payment successful'),
        ('DATA_EXPORTED', 'Data exported'),
    ]
    
    user = ForeignKey(CustomUser)
    action = CharField(choices=ACTION_CHOICES)
    ip_address = GenericIPAddressField()
    user_agent = CharField()
    status = CharField(choices=[('SUCCESS', 'Success'), ('FAILED', 'Failed')])
    created_at = DateTimeField(auto_now_add=True)
    
    # Immutable
    class Meta:
        db_table = 'user_audit_log'
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['action']),
        ]
```

### 9.2 Logging Configuration

```python
# settings.py
LOGGING = {
    'handlers': {
        'security_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/averagejoes/security.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 50,
        }
    },
    'loggers': {
        'apps.auth': {
            'handlers': ['security_file'],
            'level': 'INFO',
        }
    }
}

# Usage
logger.info(f"User login: {user.email} from {ip_address}")
logger.warning(f"Failed MFA: {user.email}")
logger.error(f"Payment failed: {order.order_number}")
```

## 10. Deployment Security Checklist

- [ ] Change SECRET_KEY in production
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS with actual domain
- [ ] Enable SECURE_SSL_REDIRECT=True
- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Configure secure database password
- [ ] Set up firewall rules
- [ ] Enable WAF (AWS WAF or Cloudflare)
- [ ] Configure backup strategy
- [ ] Set up monitoring/alerting
- [ ] Enable 2FA for admin accounts
- [ ] Create disaster recovery plan
- [ ] Schedule security audits
- [ ] Keep dependencies updated
- [ ] Set up intrusion detection

## Additional Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- PCI-DSS Requirements: https://www.pcisecuritystandards.org/
- GDPR Compliance: https://gdpr-info.eu/
- Django Security: https://docs.djangoproject.com/en/stable/topics/security/
