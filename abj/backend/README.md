# Django Backend - AverageJoes Food Ordering Platform

## Project Overview

This is a complete Django migration of the AverageJoes food ordering platform with enterprise-grade security features:

- **Authentication**: MFA (TOTP), OAuth 2.0 (Google, GitHub, Facebook), JWT tokens
- **Security**: PCI-DSS compliance, GDPR data privacy, RBAC, SSL/TLS, HTTPS, rate limiting
- **Database**: PostgreSQL with advanced indexing
- **API**: GraphQL + REST API, both production-ready
- **Features**: Restaurants, menu items, combos, orders, ratings, social (friends)

## Architecture

```
backend/
├── config/                 # Django project settings
│   ├── settings.py        # All security & production settings
│   ├── urls.py            # URL routing
│   ├── asgi.py            # ASGI for WebSockets
│   ├── wsgi.py            # WSGI for deployment
│   └── schema.py          # GraphQL schema
├── apps/
│   ├── auth/              # Authentication (MFA, OAuth, login/register)
│   ├── users/             # Custom user model with audit logging
│   ├── restaurants/       # Restaurant management
│   ├── menu_items/        # Menu items with dietary info
│   ├── combos/            # Bundle deals
│   ├── orders/            # PCI-DSS compliant orders
│   ├── ratings/           # Emoji-based reviews
│   ├── friends/           # Social features
│   └── carts/             # Shopping carts
├── manage.py              # Django management
├── requirements.txt       # Python dependencies
└── .env.example          # Environment variables template
```

## Security Features

### Authentication & MFA
- **TOTP-based MFA** (Google Authenticator, Authy)
- **Backup codes** for account recovery
- **OAuth 2.0** integration (Google, GitHub, Facebook)
- **Adaptive authentication** with risk scoring
- **Session management** with device fingerprinting

### Password Security
- **Minimum 15 characters** (as requested)
- **Complexity requirements**: uppercase, lowercase, digit, special char
- **Password history** to prevent reuse
- **Rate limiting** on failed login attempts (5 attempts = 30 min lockout)
- **Audit logging** for password changes

### Data Protection
- **HTTPS/TLS/SSL** enforcement (HSTS header)
- **CORS** properly configured
- **CSRF protection** with secure cookies
- **Content Security Policy** (CSP) headers
- **Secure session cookies** (HttpOnly, Secure, SameSite)

### PCI-DSS Compliance
- **Stripe integration** (no card data stored locally)
- **Tokenization** for payments
- **Encrypted transaction IDs**
- **Audit logs** for all transactions
- **PCI-compliant** architecture

### GDPR Compliance
- **Data retention policies** (365 days for users, 30 days for deleted data)
- **Right to be forgotten** (soft delete + purge)
- **Data export** capability
- **Privacy levels** (public, friends, private)
- **Consent tracking**
- **Data encryption** for sensitive fields

### RBAC (Role-Based Access Control)
- **Roles**: Customer, Restaurant Owner, Moderator, Admin
- **Permission system**: granular per-action permissions
- **Admin panel** with full control
- **Resource-level access** (users can only see their own data)

### Rate Limiting & Throttling
- **API rate limits**: 100 requests/hour (anonymous), 1000/hour (authenticated)
- **Brute force protection**: lockout after 5 failed attempts
- **DDoS mitigation** via rate limiting

### Encryption & Hashing
- **Password hashing**: bcrypt with salt
- **Sensitive data**: encrypted at rest
- **Tokens**: JWT with HS256
- **Payment data**: handled by Stripe (PCI-DSS certified)

## Setup Instructions

### Prerequisites
- Python 3.10+
- PostgreSQL 13+
- Redis (for caching & Celery)
- Node.js 16+ (if keeping React frontend)

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb average_joes_db
createuser average_joes_user --pwprompt

# Grant privileges
psql -U postgres -d average_joes_db -c "GRANT ALL PRIVILEGES ON DATABASE average_joes_db TO average_joes_user;"
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings:
# - DATABASE_URL
# - SECRET_KEY (generate: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
# - STRIPE keys
# - OAuth credentials

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Create cache table
python manage.py createcachetable

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver
```

### 3. Generate Secret Key

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Environment Variables

Create `.env` file:

```env
# Django
DEBUG=False
SECRET_KEY=your-generated-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=average_joes_db
DB_USER=average_joes_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# HTTPS/SSL
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000

# JWT
JWT_SECRET_KEY=your-jwt-secret-key

# Stripe (PCI-DSS)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OAuth
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GITHUB_OAUTH_CLIENT_ID=...
GITHUB_OAUTH_CLIENT_SECRET=...

# Email
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Redis
REDIS_URL=redis://localhost:6379/0

# AWS S3 (optional, for media storage)
USE_S3=False
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_STORAGE_BUCKET_NAME=...
```

### 5. API Documentation

Access at `http://localhost:8000/api/docs/` after setup.

**REST API Endpoints:**
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login
- `POST /api/auth/mfa/setup/` - Setup MFA
- `GET /api/users/me/` - Get current user
- `GET /api/restaurants/` - List restaurants
- `GET /api/menu-items/` - List menu items
- `POST /api/carts/` - Get/create cart
- `POST /api/orders/` - Create order
- `POST /api/ratings/` - Create rating

**GraphQL Endpoint:**
- `POST /graphql/` - GraphQL queries & mutations
- Interactive playground at `/graphql/?graphiql=true`

## Running in Production

### With Gunicorn + Nginx

```bash
# Install Gunicorn
pip install gunicorn

# Run Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4

# Or use systemd service (recommended)
```

### Docker Deployment

```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## Migration from Node.js Backend

### Data Migration Steps

1. **Export MongoDB data:**
   ```bash
   mongoexport --db average_joes --collection users --out users.json
   mongoexport --db average_joes --collection menuItems --out menu_items.json
   # ... repeat for other collections
   ```

2. **Custom management command for import:**
   ```bash
   python manage.py import_from_mongodb --file users.json --model users.CustomUser
   ```

3. **Verify data integrity:**
   ```bash
   python manage.py dbshell
   SELECT COUNT(*) FROM auth_user;
   SELECT COUNT(*) FROM menu_item;
   # ... etc
   ```

## Testing

```bash
# Run tests
python manage.py test

# With coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report

# Specific app tests
python manage.py test apps.auth
```

## Monitoring & Logging

- **Security logs**: `logs/security.log` (authentication, MFA, OAuth events)
- **Debug logs**: `logs/debug.log` (general application logs)
- **Access logs**: Configure in Nginx/Gunicorn
- **Error tracking**: Set up Sentry for production

## Performance Optimization

- **Database indexes**: Created on all lookup fields
- **Caching**: Redis for sessions, OTP codes, rate limiting
- **Query optimization**: select_related/prefetch_related used
- **Static files**: WhiteNoise for efficient serving
- **Compression**: Gzip enabled in settings

## Security Checklist

- [ ] Change `SECRET_KEY` in production
- [ ] Set `DEBUG=False` in production
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Enable `SECURE_SSL_REDIRECT=True`
- [ ] Set up HTTPS with SSL certificate
- [ ] Configure CORS origins properly
- [ ] Add Stripe webhook signing secret
- [ ] Set up email for password resets
- [ ] Enable 2FA in admin
- [ ] Set up monitoring/alerting
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Frontend Integration

### Option 1: React SPA (Recommended for gradual migration)
The React frontend can continue as a separate SPA, consuming the Django API:

```javascript
// React client configuration
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Example API call
const login = async (email, password, mfaToken) => {
  const response = await fetch(`${API_BASE}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, mfa_token: mfaToken })
  });
  return response.json();
};
```

Update `client/.env`:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GRAPHQL_URL=http://localhost:8000/graphql/
```

### Option 2: Django Templates
For full Django integration, convert React components to Django templates.

## Troubleshooting

**MFA not working:**
```bash
python manage.py shell
from apps.users.models import CustomUser
user = CustomUser.objects.get(username='your-user')
print(user.totp_secret)  # Should be set
```

**Migration issues:**
```bash
python manage.py showmigrations
python manage.py migrate apps.users 0001
```

**Static files not loading:**
```bash
python manage.py collectstatic --clear --noinput
```

## Support & Documentation

- Django: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Graphene: https://docs.graphene-python.org/
- PyOTP (MFA): https://github.com/pyauth/pyotp
- Stripe: https://stripe.com/docs

## License

See LICENSE file in parent directory.
