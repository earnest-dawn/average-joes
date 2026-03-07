"""
Load seed data into Django
Usage: python manage.py load_seeds
"""
import json
import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.restaurants.models import Restaurant
from apps.menu_items.models import MenuItem
from apps.combos.models import Combo
import uuid

User = get_user_model()


class Command(BaseCommand):
    help = 'Load seed data from JSON files'

    def handle(self, *args, **options):
        self.stdout.write('Loading seed data...')
        
        # Create test restaurants
        restaurants_data = [
            {
                "id": "69704ba034657aa424464b6e",
                "name": "The Grill House",
                "category": "American",
                "description": "Classic American grill and steakhouse",
            },
            {
                "id": "6972f078a012f428866fc018",
                "name": "Tropical Smoothie",
                "category": "American",
                "description": "Fresh fruits and tropical beverages",
            }
        ]
        
        # Create or get admin user (owner)
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@averagejoes.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True,
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Created admin user'))
        
        # Load restaurants
        restaurant_map = {}
        for rest_data in restaurants_data:
            # Use the MongoDB ID as a reference but create UUID for Django
            try:
                restaurant = Restaurant.objects.get(name=rest_data['name'])
            except Restaurant.DoesNotExist:
                restaurant = Restaurant.objects.create(
                    id=uuid.uuid4(),
                    name=rest_data['name'],
                    category=rest_data['category'],
                    description=rest_data.get('description', ''),
                    owner=admin_user,
                    phone_number='(555) 123-4567',
                    email='contact@restaurant.com',
                    street_address='123 Main St',
                    city='New York',
                    state='NY',
                    zip_code='10001',
                    country='USA',
                )
                self.stdout.write(self.style.SUCCESS(f'Created restaurant: {restaurant.name}'))
            
            restaurant_map[rest_data['id']] = restaurant
        
        # Load menu items
        menu_items_file = '/home/edawn/average-joes/abj/client/public/MenuItemsSeeds.json'
        try:
            with open(menu_items_file, 'r') as f:
                menu_items_data = json.load(f)
            
            menu_item_map = {}
            for item_data in menu_items_data:
                mongo_id = item_data['_id']
                rest_id = item_data.get('restaurant', '69704ba034657aa424464b6e')
                
                try:
                    menu_item = MenuItem.objects.get(name=item_data['name'])
                except MenuItem.DoesNotExist:
                    # Get the restaurant
                    restaurant = restaurant_map.get(rest_id)
                    if not restaurant:
                        restaurant = list(restaurant_map.values())[0]
                    
                    menu_item = MenuItem.objects.create(
                        id=uuid.uuid4(),
                        name=item_data['name'],
                        description=item_data.get('ingredients', ''),
                        category=item_data.get('category', 'entree'),
                        price=item_data.get('price', 10),
                        calories=item_data.get('calories', 0),
                        ingredients=item_data.get('ingredients', ''),
                        restaurant=restaurant,
                    )
                    self.stdout.write(f'Created menu item: {menu_item.name}')
                
                menu_item_map[mongo_id] = menu_item
            
        except FileNotFoundError:
            self.stdout.write(self.style.WARNING(f'Menu items file not found: {menu_items_file}'))
        
        # Load combos
        combos_file = '/home/edawn/average-joes/abj/client/public/CombosSeeds.json'
        try:
            with open(combos_file, 'r') as f:
                combos_data = json.load(f)
            
            for combo_data in combos_data:
                try:
                    combo = Combo.objects.get(title=combo_data['title'])
                except Combo.DoesNotExist:
                    # Get first restaurant
                    restaurant = list(restaurant_map.values())[0]
                    
                    combo = Combo.objects.create(
                        id=uuid.uuid4(),
                        title=combo_data['title'],
                        description=combo_data.get('description', ''),
                        price=combo_data.get('price', 10),
                        original_price=combo_data.get('price', 10),  # Use same as price
                        restaurant=restaurant,
                    )
                    
                    # Add menu items to combo
                    for item_id in combo_data.get('menuItems', []):
                        if item_id in menu_item_map:
                            combo.menu_items.add(menu_item_map[item_id])
                    
                    combo.save()
                    self.stdout.write(self.style.SUCCESS(f'Created combo: {combo.title}'))
        
        except FileNotFoundError:
            self.stdout.write(self.style.WARNING(f'Combos file not found: {combos_file}'))
        
        self.stdout.write(self.style.SUCCESS('Seed data loaded successfully!'))
