# apps/menu_items/apps.py
from django.apps import AppConfig


class MenuItemsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.menu_items'
    verbose_name = 'Menu Items'
