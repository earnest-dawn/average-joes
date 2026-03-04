"""
Custom password validators for enterprise security
"""

import re
from django.contrib.auth.password_validation import get_password_validators
from django.core.exceptions import ValidationError


class PasswordComplexityValidator:
    """
    Validates that password meets complexity requirements:
    - At least 15 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    - At least one special character
    """
    
    def __init__(self):
        self.min_length = 15
    
    def validate(self, password, user=None):
        errors = []
        
        if len(password) < self.min_length:
            errors.append(
                ValidationError(
                    f'Password must be at least {self.min_length} characters long.',
                    code='password_too_short',
                )
            )
        
        if not re.search(r'[A-Z]', password):
            errors.append(
                ValidationError(
                    'Password must contain at least one uppercase letter.',
                    code='password_no_upper',
                )
            )
        
        if not re.search(r'[a-z]', password):
            errors.append(
                ValidationError(
                    'Password must contain at least one lowercase letter.',
                    code='password_no_lower',
                )
            )
        
        if not re.search(r'\d', password):
            errors.append(
                ValidationError(
                    'Password must contain at least one digit.',
                    code='password_no_digit',
                )
            )
        
        if not re.search(r'[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]', password):
            errors.append(
                ValidationError(
                    'Password must contain at least one special character.',
                    code='password_no_special',
                )
            )
        
        if errors:
            raise ValidationError(errors)
    
    def get_help_text(self):
        return (
            'Your password must be at least 15 characters long and contain at least '
            'one uppercase letter, one lowercase letter, one digit, and one special character.'
        )
