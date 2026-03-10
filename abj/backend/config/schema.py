import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from apps.restaurants.models import Restaurant
from apps.menu_items.models import MenuItem
from apps.combos.models import Combo
from apps.orders.models import Order, OrderItem
from apps.ratings.models import Rating
from apps.friends.models import Friend
from apps.carts.models import Cart, CartItem

User = get_user_model()

# ============================================================================
# OBJECT TYPES
# ============================================================================

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'bio', 'role', 'is_active']
        name = "User"

class RestaurantType(DjangoObjectType):
    # Field expected by Relay
    location = graphene.String()

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'category', 'phone_number', 'email', 'website', 'average_rating', 'is_verified']
        name = "RestaurantType"
    
    def resolve_location(self, info):
        # Return address or empty string if field doesn't exist on model
        return getattr(self, 'address', "")

class MenuItemType(DjangoObjectType):
    caption = graphene.String()
    in_stock = graphene.Boolean()
    ratings = graphene.List(lambda: RatingType)
    
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'category', 'price', 'discount_price', 'calories', 'ingredients', 'is_vegetarian', 'is_vegan', 'average_rating', 'images']
        name = "MenuItems"
    
    def resolve_caption(self, info): return self.description
    def resolve_in_stock(self, info): return self.in_stock
    def resolve_ratings(self, info):
        menu_item_ct = ContentType.objects.get_for_model(MenuItem)
        return Rating.objects.filter(content_type=menu_item_ct, object_id=self.id, status='APPROVED')

class ComboType(DjangoObjectType):
    class Meta:
        model = Combo
        fields = ['id', 'title', 'description', 'price', 'original_price', 'menu_items', 'is_available', 'average_rating']
        name = "Combos"

class RatingType(DjangoObjectType):
    rating_text = graphene.String()
    created_at = graphene.String()
    images = graphene.List(graphene.String)
    
    class Meta:
        model = Rating
        fields = ['id', 'user', 'emoji', 'comment', 'rating_score', 'title', 'created_at', 'helpful_count']
        name = "Rating"
    
    def resolve_rating_text(self, info): return self.comment
    def resolve_created_at(self, info): return self.created_at.isoformat() if self.created_at else None
    def resolve_images(self, info): return []

class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'combo', 'quantity', 'price_at_purchase', 'total']

class OrderType(DjangoObjectType):
    order_items = graphene.List(OrderItemType)
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'customer', 'restaurant', 'status', 'payment_status', 'total_price', 'created_at', 'completed_at']
    def resolve_order_items(self, info): return self.order_items.all()

class FriendType(DjangoObjectType):
    class Meta:
        model = Friend
        fields = ['id', 'user', 'friend', 'status', 'created_at']
        name = "Friend"

class CartItemType(DjangoObjectType):
    class Meta:
        model = CartItem
        fields = ['id', 'menu_item', 'combo', 'quantity', 'unit_price', 'special_instructions']

class CartType(DjangoObjectType):
    total = graphene.Float()
    total_price = graphene.Float() # Alias for Relay

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']
    
    def resolve_total(self, info): return float(self.get_total())
    def resolve_total_price(self, info): return float(self.get_total())

# ============================================================================
# MUTATIONS
# ============================================================================

class ResponseFields:
    success = graphene.Boolean()
    code = graphene.String()
    message = graphene.String()

# AUTH
class Register(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
    user = graphene.Field(UserType)
    token = graphene.String() # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return Register(success=True, code="200", token="mock-token")

class Login(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    user = graphene.Field(UserType)
    token = graphene.String()
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return Login(success=True, code="200", token="mock-token")

# RESTAURANTS
class CreateRestaurant(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        name = graphene.String(required=True)
        description = graphene.String()
    restaurant = graphene.Field(RestaurantType)
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return CreateRestaurant(success=True, code="201")

class EditRestaurant(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        id = graphene.UUID(required=True)
        name = graphene.String()
    restaurant = graphene.Field(RestaurantType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return EditRestaurant(success=True)

class DeleteRestaurant(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    restaurant = graphene.Field(RestaurantType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return DeleteRestaurant(success=True)

class ClaimRestaurantOwnership(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    restaurant = graphene.Field(RestaurantType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return ClaimRestaurantOwnership(success=True)

# MENU ITEMS
class CreateMenuItem(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: name = graphene.String(required=True)
    menu_item = graphene.Field(MenuItemType) # Fixed casing for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return CreateMenuItem(success=True)

class EditMenuItem(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    menu_item = graphene.Field(MenuItemType) # Fixed casing for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return EditMenuItem(success=True)

class DeleteMenuItem(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    menu_item = graphene.Field(MenuItemType) # Fixed casing for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return DeleteMenuItem(success=True)

class ToggleStockStatus(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    menu_item = graphene.Field(MenuItemType) # Fixed casing for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return ToggleStockStatus(success=True)

# COMBOS
class CreateCombos(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: title = graphene.String(required=True)
    combos = graphene.Field(ComboType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return CreateCombos(success=True)

class EditCombos(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    combos = graphene.Field(ComboType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return EditCombos(success=True)

class DeleteCombos(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    combos = graphene.Field(ComboType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return DeleteCombos(success=True)

# RATINGS
class CreateRating(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        emoji = graphene.String(required=True)
        rating_score = graphene.Int()
        menu_item_id = graphene.UUID()
        restaurant_id = graphene.UUID()
    rating = graphene.Field(RatingType)
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return CreateRating(success=True, code="201")

class DeleteRating(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    rating = graphene.Field(RatingType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return DeleteRating(success=True)

# CART / ORDERS
class AddToCart(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        menu_item_id = graphene.UUID()
        quantity = graphene.Int()
    cart = graphene.Field(CartType)
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return AddToCart(success=True)

class RemoveFromCart(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: cart_item_id = graphene.UUID(required=True)
    cart = graphene.Field(CartType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return RemoveFromCart(success=True)

class CreateOrder(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: restaurant_id = graphene.UUID(required=True)
    order = graphene.Field(OrderType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return CreateOrder(success=True)

class Checkout(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: cart_id = graphene.UUID(required=True)
    order = graphene.Field(OrderType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return Checkout(success=True)

class UpdateOrderStatus(graphene.relay.ClientIDMutation, ResponseFields):
    class Input:
        id = graphene.UUID(required=True)
        status = graphene.String()
    order = graphene.Field(OrderType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return UpdateOrderStatus(success=True)

class DeleteOrder(graphene.relay.ClientIDMutation, ResponseFields):
    class Input: id = graphene.UUID(required=True)
    order = graphene.Field(OrderType) # Added for Relay
    @classmethod
    def mutate_and_get_payload(cls, root, info, **input): return DeleteOrder(success=True)

# ============================================================================
# ROOT QUERY
# ============================================================================

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    user = graphene.Field(UserType, id=graphene.UUID(required=True))
    all_users = graphene.List(UserType)
    restaurant = graphene.Field(RestaurantType, id=graphene.UUID(required=True))
    all_restaurants = graphene.List(RestaurantType)
    restaurants = graphene.List(RestaurantType)
    restaurants_by_category = graphene.List(RestaurantType, category=graphene.String(required=True))
    menu_item = graphene.Field(MenuItemType, id=graphene.UUID(required=True))
    all_menu_items = graphene.List(MenuItemType)
    menu_items = graphene.List(MenuItemType)
    menuItems = graphene.List(MenuItemType)
    menu_items_by_restaurant = graphene.List(MenuItemType, restaurant_id=graphene.UUID(required=True))
    combo = graphene.Field(ComboType, id=graphene.UUID(required=True))
    all_combos = graphene.List(ComboType)
    combos = graphene.List(ComboType)
    combos_by_restaurant = graphene.List(ComboType, restaurant_id=graphene.UUID(required=True))
    my_orders = graphene.List(OrderType)
    order = graphene.Field(OrderType, id=graphene.UUID(required=True))
    ratings = graphene.List(RatingType)
    my_friends = graphene.List(FriendType)
    friend_requests = graphene.List(FriendType)
    my_cart = graphene.Field(CartType)

    def resolve_me(self, info):
        user = info.context.user
        return user if user.is_authenticated else None
    def resolve_user(self, info, id): return User.objects.filter(id=id).first()
    def resolve_all_users(self, info): return User.objects.filter(is_active=True)
    def resolve_restaurant(self, info, id): return Restaurant.objects.filter(id=id).first()
    def resolve_all_restaurants(self, info): return Restaurant.objects.filter(is_active=True).order_by('-average_rating')
    def resolve_restaurants(self, info): return Restaurant.objects.filter(is_active=True).order_by('-average_rating')
    def resolve_restaurants_by_category(self, info, category): return Restaurant.objects.filter(category=category, is_active=True)
    def resolve_menu_item(self, info, id): return MenuItem.objects.filter(id=id).first()
    def resolve_all_menu_items(self, info): return MenuItem.objects.filter(in_stock=True).order_by('-average_rating')
    def resolve_menu_items(self, info): return MenuItem.objects.filter(in_stock=True).order_by('-average_rating')
    def resolve_menuItems(self, info): return MenuItem.objects.filter(in_stock=True).order_by('-average_rating')
    def resolve_menu_items_by_restaurant(self, info, restaurant_id): return MenuItem.objects.filter(restaurant_id=restaurant_id, in_stock=True)
    def resolve_combo(self, info, id): return Combo.objects.filter(id=id).first()
    def resolve_all_combos(self, info): return Combo.objects.filter(is_available=True).order_by('-average_rating')
    def resolve_combos(self, info): return Combo.objects.filter(is_available=True).order_by('-average_rating')
    def resolve_combos_by_restaurant(self, info, restaurant_id): return Combo.objects.filter(restaurant_id=restaurant_id, is_available=True)
    def resolve_my_orders(self, info):
        user = info.context.user
        return Order.objects.filter(customer=user).order_by('-created_at') if user.is_authenticated else []
    def resolve_order(self, info, id):
        user = info.context.user
        order = Order.objects.filter(id=id).first()
        return order if order and (user == order.customer or user.is_staff) else None
    def resolve_ratings(self, info): return Rating.objects.filter(status='APPROVED').order_by('-created_at')
    def resolve_my_friends(self, info):
        user = info.context.user
        return Friend.objects.filter(user=user, status='ACCEPTED') if user.is_authenticated else []
    def resolve_friend_requests(self, info):
        user = info.context.user
        return Friend.objects.filter(friend=user, status='PENDING') if user.is_authenticated else []
    def resolve_my_cart(self, info):
        user = info.context.user
        if user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=user)
            return cart
        return None

class Mutation(graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    create_restaurant = CreateRestaurant.Field()
    edit_restaurant = EditRestaurant.Field()
    delete_restaurant = DeleteRestaurant.Field()
    claim_restaurant_ownership = ClaimRestaurantOwnership.Field()
    create_menu_items = CreateMenuItem.Field()
    edit_menu_items = EditMenuItem.Field()
    delete_menu_items = DeleteMenuItem.Field()
    toggle_stock_status = ToggleStockStatus.Field()
    create_combos = CreateCombos.Field()
    edit_combos = EditCombos.Field()
    delete_combos = DeleteCombos.Field()
    create_rating = CreateRating.Field()
    delete_rating = DeleteRating.Field()
    add_to_cart = AddToCart.Field()
    remove_from_cart = RemoveFromCart.Field()
    create_order = CreateOrder.Field()
    checkout = Checkout.Field()
    update_order_status = UpdateOrderStatus.Field()
    delete_order = DeleteOrder.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)