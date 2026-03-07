# Technical Architecture Documentation

## System Overview

Average Joe's is a social media food truck ordering application built with:
- **Frontend**: React 18 with Relay for GraphQL
- **Backend**: Django with GraphQL (Graphene)
- **Database**: MongoDB/SQLite
- **API**: GraphQL with Relay Modern

## High-Level Architecture

```
┌──────────────────────────┐
│   Client Layer           │
│                          │
│  React Components        │
│  ├─ OrderOnlinePage     │
│  ├─ LoginPage           │
│  ├─ CartComponent       │
│  └─ AdminDashboard      │
│                          │
│  Relay Runtime           │
│  ├─ Cache                │
│  ├─ Store                │
│  └─ Network Layer        │
└──────────────┬───────────┘
               │ GraphQL over HTTP
               │ (JSON)
┌──────────────▼───────────┐
│  Backend Layer           │
│                          │
│  GraphQL API             │
│  ├─ Resolvers           │
│  ├─ Mutations           │
│  ├─ Subscriptions       │
│  └─ Type Definitions    │
│                          │
│  Django ORM              │
│  ├─ Models              │
│  ├─ Migrations          │
│  └─ Authentication      │
│                          │
│  Database               │
│  ├─ Collections         │
│  ├─ Documents           │
│  └─ Indexes             │
└──────────────────────────┘
```

## File Structure

### Frontend (React + Relay)

```
client/
├── public/
│   ├── index.html          # Entry point
│   └── assets/             # Images, fonts, etc
│
├── src/
│   ├── index.js            # React root
│   ├── App.jsx             # Main app component
│   ├── RelayEnvironment.js # Network layer (CRITICAL)
│   │
│   ├── pages/
│   │   ├── OrderOnlinePage/
│   │   │   ├── index.jsx           # ✅ WORKING - Shopping page
│   │   │   ├── __generated__/      # Auto: OrderOnlinePageQuery.graphql.js
│   │   │   └── OrderOnline.css
│   │   │
│   │   ├── LoginPage/              # ⏳ To implement
│   │   ├── RegistrationPage/       # ⏳ To implement
│   │   ├── AdminPages/             # ⏳ To implement (CRUD)
│   │   ├── SearchPage/             # Not implemented yet
│   │   └── CartPage/               # ⏳ To implement
│   │
│   ├── components/
│   │   ├── Layout/                 # Page layout
│   │   ├── Navbar/                 # Navigation header
│   │   ├── Cart/                   # ⏳ To create
│   │   ├── Footer/                 # Footer
│   │   └── inputs/                 # Form inputs
│   │
│   ├── hooks/
│   │   └── useActivateAnimation.js # Custom hooks
│   │
│   ├── utils/
│   │   ├── auth.js                 # Authentication utility
│   │   ├── randNum.js              # Random number utility
│   │   │
│   │   ├── mutations/
│   │   │   ├── mutations.js        # ✅ Cart mutations defined
│   │   │   └── __generated__/      # Auto-generated files
│   │   │
│   │   └── queries/                # GraphQL queries (if any)
│   │
│   ├── RelayFragments/
│   │   ├── MenuItemsFragment/      # ✅ Fragment for menu items
│   │   ├── RatingFragment/         # ✅ Fragment for ratings
│   │   ├── UserFragment/           # ✅ Fragment for users
│   │   ├── FriendFragment/         # ✅ Fragment for friends
│   │   └── CombosFragment/         # ✅ Fragment for combos
│   │
│   └── assets/                     # Images
│
├── relay.config.json       # ✅ Relay compiler config
├── package.json            # ✅ With relay script
└── public/                 # Public assets

Configuration Files (Root):
├── relay.config.js         # Old config (deprecated)
├── schema.graphql          # ✅ Auto-generated from Django
├── RELAY_COMPILER_INTEGRATION.md
├── INTEGRATION_STATUS_FINAL.md
├── SESSION_2_REPORT.md
├── QUICK_START.md
└── INTEGRATION_READY.md
```

### Backend (Django)

```
backend/
├── config/
│   ├── settings.py         # Django configuration
│   ├── urls.py             # URL routing
│   ├── schema.py           # ✅ GraphQL schema definition
│   │   ├── Types (ObjectTypes)
│   │   │   ├─ UserType
│   │   │   ├─ MenuItemType
│   │   │   ├─ ComboType
│   │   │   ├─ RatingType
│   │   │   ├─ CartType
│   │   │   ├─ CartItemType
│   │   │   ├─ OrderType
│   │   │   ├─ RestaurantType
│   │   │   └─ FriendType
│   │   │
│   │   ├── InputTypes
│   │   │   ├─ CreateRatingInput
│   │   │   ├─ LoginInput ⏳ To add
│   │   │   ├─ RegisterInput ⏳ To add
│   │   │   └─ CreateOrderInput ⏳ To add
│   │   │
│   │   ├── Mutations
│   │   │   ├─ CreateRating ✅
│   │   │   ├─ AddToCart ✅
│   │   │   ├─ RemoveFromCart ✅
│   │   │   ├─ Login ⏳
│   │   │   ├─ Register ⏳
│   │   │   ├─ CreateOrder ⏳
│   │   │   └─ AdminCRUD ⏳
│   │   │
│   │   └── Queries
│   │       ├─ menuItems ✅
│   │       ├─ restaurants ✅
│   │       ├─ combos ✅
│   │       ├─ ratings ✅
│   │       ├─ me ✅
│   │       ├─ myCart ✅
│   │       └─ orders ⏳
│   │
│   ├── wsgi.py             # WSGI for production
│   └── asgi.py             # ASGI for async
│
├── apps/
│   ├── menu_items/
│   │   ├── models.py       # MenuItem model
│   │   ├── migrations/
│   │   └── ...
│   │
│   ├── carts/
│   │   ├── models.py       # Cart & CartItem models
│   │   ├── serializers.py
│   │   └── ...
│   │
│   ├── users/
│   │   ├── models.py       # User model
│   │   ├── auth.py         # Auth utilities
│   │   └── ...
│   │
│   ├── restaurants/
│   │   ├── models.py       # Restaurant model
│   │   └── ...
│   │
│   ├── ratings/
│   │   ├── models.py       # Rating model
│   │   └── ...
│   │
│   ├── orders/
│   │   ├── models.py       # Order & OrderItem models
│   │   └── ...
│   │
│   ├── friends/
│   │   ├── models.py       # Friend/Friendship model
│   │   └── ...
│   │
│   └── combos/
│       ├── models.py       # Combo model
│       └── ...
│
├── manage.py               # Django CLI
├── requirements.txt        # Python dependencies
└── seeds/                  # Initial data

Key Models:
- User: username, email, password, avatar, bio, role
- MenuItem: name, price, description, calories, ingredients, images
- Cart: user, items, created_at
- CartItem: cart, menu_item, combo, quantity, unit_price
- Order: customer, restaurant, items, status, total_price
- Rating: user, content_type, emoji, comment, rating_score
- Restaurant: name, description, owner, menu_items
- Combo: title, price, menu_items
- Friend: user, friend, status (PENDING/ACCEPTED/BLOCKED)
```

## Data Flow Diagrams

### 1. Fetching Menu Items

```
User visits OrderOnlinePage
    ↓
Component calls: useLazyLoadQuery(OrderOnlinePageQuery, {})
    ↓
Relay checks cache - miss
    ↓
Relay calls RelayEnvironment.fetchQuery()
    ↓
POST /graphql/ with operation.text:
"query OrderOnlinePageQuery { 
  menuItems { 
    id name price caption images category inStock 
    ...MenuItemsFragment 
  } 
}"
    ↓
Proxy (localhost:3000) routes to Django (localhost:8000)
    ↓
Django resolves menuItems query
    ↓
Django Query.menuItems resolver executes:
  - filters by restaurantId if provided
  - returns all MenuItem objects
  - resolves caption (alias for description)
  - resolves inStock field
  - includes ratings via resolve_ratings
    ↓
Django returns JSON:
{
  "data": {
    "menuItems": [
      {
        "id": "...",
        "name": "Storm Claw",
        "price": "10.00",
        "caption": "chicken, lettuce, tomato...",
        "images": [],
        "category": "ENTREE",
        "inStock": true,
        "ratings": [...]
      },
      ...
    ]
  }
}
    ↓
Relay receives response
    ↓
Relay normalizes and caches data
    ↓
Component re-renders with data
    ↓
MenuItems display on page ✓
```

### 2. Adding Item to Cart

```
User clicks "Add to Cart" button on menu item
    ↓
Component calls: commitAddToCart({
  variables: {
    menuItemId: "c0920677-8e5b-4c00-a769-b9d1f44b2b8e",
    quantity: 1
  }
})
    ↓
Relay sends POST /graphql/ with operation.text:
"mutation OrderOnlinePageAddToCartMutation(
  $menuItemId: UUID
  $quantity: Int = 1
) {
  addToCart(menuItemId: $menuItemId, quantity: $quantity) {
    cart { id total items { ... } }
    success
    message
  }
}"
Variables: { "menuItemId": "...", "quantity": 1 }
    ↓
Django receives mutation request
    ↓
Django validates mutation arguments
    ↓
Django Mutation.addToCart resolver:
  1. Gets current user from context
  2. Creates/gets user's cart
  3. Gets MenuItem from database
  4. Creates CartItem with:
     - cart = user's cart
     - menu_item = MenuItem object
     - quantity = 1
     - unit_price = MenuItem.price
  5. Saves CartItem to database
  6. Queries cart.items (CartItem objects)
  7. Returns Cart object with full item details
    ↓
Django returns JSON:
{
  "data": {
    "addToCart": {
      "cart": {
        "id": "...",
        "total": "10.00",
        "items": [
          {
            "id": "...",
            "menuItem": {"id": "...", "name": "Storm Claw", "price": "10.00"},
            "quantity": 1,
            "unitPrice": "10.00"
          }
        ]
      },
      "success": true,
      "message": "Item added to cart"
    }
  }
}
    ↓
Relay receives response
    ↓
Relay updates cache with Cart data
    ↓
Component receives updated cart via onCompleted callback
    ↓
Application state updates
    ↓
UI re-renders to show item in cart (when UI implemented) ✓
```

## Database Schema (Key Collections)

### User
```
{
  id: UUID
  username: String (unique)
  email: String (unique)
  password: String (hashed)
  avatar: String (URL)
  bio: String
  role: Enum(USER, ADMIN, RESTAURANT_OWNER)
  created_at: DateTime
  is_active: Boolean
}
```

### MenuItem
```
{
  id: UUID
  name: String
  description: String
  price: Decimal
  discount_price: Decimal (nullable)
  calories: Int
  ingredients: String
  category: String (ENTREE, DRINK, APPETIZER, etc)
  is_vegetarian: Boolean
  is_vegan: Boolean
  average_rating: Float
  images: [String] (URLs)
  restaurant: ForeignKey(Restaurant)
  created_at: DateTime
}
```

### Cart
```
{
  id: UUID
  user: ForeignKey(User, OneToOne)
  created_at: DateTime
  updated_at: DateTime
}
```

### CartItem
```
{
  id: UUID
  cart: ForeignKey(Cart)
  menu_item: ForeignKey(MenuItem, nullable)
  combo: ForeignKey(Combo, nullable)
  quantity: Int (>= 1)
  unit_price: Decimal
  special_instructions: String
  added_at: DateTime
  updated_at: DateTime
  
  Unique constraint: (cart, menu_item, combo)
}
```

### Order
```
{
  id: UUID
  order_number: String (unique)
  customer: ForeignKey(User)
  restaurant: ForeignKey(Restaurant)
  items: ForeignKey(OrderItem, reverse relation)
  status: Enum(PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED)
  payment_status: Enum(PENDING, PAID, REFUNDED)
  total_price: Decimal
  special_instructions: String
  created_at: DateTime
  completed_at: DateTime (nullable)
}
```

## GraphQL Type Definitions

### Current Types (✅ Working)
```graphql
type MenuItems {
  id: ID
  name: String!
  ingredients: String!
  calories: Int
  price: Float!
  caption: String  # alias for description
  images: [String]
  category: String!
  inStock: Boolean  # alias for is_in_stock
  ratings: [Rating]
  restaurant: Restaurant
}

type Combos {
  id: ID
  title: String!
  price: Float!
  menuItems: [MenuItems]
  ratings: [Rating]
}

type Rating {
  id: ID
  emoji: String
  ratingText: String  # alias for comment
  user: UserType
  createdAt: String  # alias for created_at
  images: [String]
}

type UserType {
  id: ID
  username: String!
  email: String!
  avatar: String
  bio: String
  role: String
  friends: [FriendType]
  cart: Cart
}

type Cart {
  id: ID
  total: Float
  items: [CartItem]
}

type CartItem {
  id: ID
  quantity: Int!
  unitPrice: Decimal!
  specialInstructions: String
  menuItem: MenuItems
  combo: Combos
}
```

### Mutations (✅ Ready)
```graphql
type Mutation {
  addToCart(
    menuItemId: UUID
    comboId: UUID
    quantity: Int = 1
  ): AddToCart
  
  removeFromCart(cartItemId: UUID!): RemoveFromCart
  
  createRating(input: CreateRatingInput!): CreateRating
}

input CreateRatingInput {
  emoji: String!
  comment: String
  ratingScore: Int
  menuItemId: UUID
  comboId: UUID
  restaurantId: UUID
}

type AddToCart {
  cart: Cart
  success: Boolean!
  message: String
}

type RemoveFromCart {
  cart: Cart
  success: Boolean!
}

type CreateRating {
  rating: Rating
  success: Boolean!
  message: String
}
```

## Relay Compiler Output

### Generated Artifacts Structure
```
__generated__/
├── OperationName.graphql.js
│   ├── const node = {
│   │   params: {
│   │     id: null
│   │     name: "OperationName"
│   │     operationKind: "query|mutation|subscription"
│   │     text: "query OperationName { ... }"  # CRITICAL
│   │     metadata: {}
│   │   }
│   │   selections: [...]  # Metadata for cache normalization
│   │ }
│   ├── node.hash = "..."
│   └── export default node
│
├── OperationNameFragment.graphql.js
│   └── Similar structure for fragments
│
├── OperationName.graphql.json
│   └── Operation metadata (if eagerEsModules: false)
│
└── ...other operations
```

### What Each File Does
- `OperationName.graphql.js`: Defines query/mutation with operation.text that gets sent to GraphQL server
- Fragment files: Reusable fragments across queries
- `operation.text`: The actual GraphQL query string - MUST be present for queries to work

## Network Communication

### Request Path
```
React Component (with useLazyLoadQuery hook)
    ↓
RelayEnvironment.fetchQuery()
    ↓ sends HTTP POST
React Dev Server (webpack-dev-server on :3000)
    ↓ (intercepts /graphql/ via proxy config)
    ↓ forwards HTTP POST
Django GraphQL Server (on :8000)
    ↓ processes request
    ↓ returns HTTP 200 with JSON
    ↓
React Dev Server
    ↓
RelayEnvironment receives response
    ↓
Relay cache updates
    ↓
Component re-renders
```

### Request Headers
```
POST /graphql/ HTTP/1.1
Host: localhost:3000 (React dev server)
Content-Type: application/json
Authorization: Bearer <jwt_token>
Credentials: include

{
  "query": "query OrderOnlinePageQuery { ... }",
  "variables": { ... }
}
```

### Response Format
```
{
  "data": {
    "menuItems": [
      { "id": "...", "name": "Storm Claw", ... }
    ]
  },
  "errors": [  # Optional, only if errors
    { "message": "...", "locations": [...] }
  ]
}
```

## Error Handling

### Relay Error Cases
1. **Missing operation.text**: "Must provide query string"
2. **Unknown type**: "Unknown type 'TypeName'"
3. **Unknown field**: "Cannot query field 'fieldName'"
4. **Invalid variable type**: "Variable '$var' expects type..."
5. **Authentication required**: HTTP 401 response

### Current Error Recovery
- RelayEnvironment.js logs errors
- Component can handle onError callback
- Relay retries certain failures automatically

### Future: Better Error UI
- Toast notifications for user
- Detailed error messages
- Automatic retry logic
- Error boundary component

## Performance Considerations

### Current Optimizations
- ✅ Relay normalized cache (prevents duplicate data)
- ✅ Query batching possible (not yet implemented)
- ✅ Fragment co-location (reduces field selection mismatches)
- ✅ useLazyLoadQuery (loads data on demand)

### Future Optimizations
- Implement persisted queries (smaller request size)
- Add pagination for menu items
- Implement subscription for real-time cart updates
- Optimize images with CDN
- Add ServiceWorker caching
- Implement field-level caching strategies

## Security Considerations

### Current
- JWT token support in RelayEnvironment
- CORS configured in Django
- CSRF token handling (Django built-in)
- User authentication checks in resolvers

### To Implement
- Rate limiting on GraphQL endpoint
- Query complexity analysis
- Introspection disabled in production
- Sensitive field masking
- Input validation/sanitization
- Authorization checks on mutations

## Deployment

### Environment Variables Needed
```
# Backend (.env)
DEBUG=False
SECRET_KEY=<very-long-random-string>
DATABASE_URL=<mongodb-connection-string>
ALLOWED_HOSTS=yourdomain.com

# Frontend (.env)
REACT_APP_API_URL=https://api.yourdomain.com/graphql
REACT_APP_JWT_KEY=app_auth_token
```

### Production Build
```bash
# Frontend
npm run build  # Creates optimized build in client/build/

# Backend
python manage.py collectstatic
gunicorn config.wsgi --bind 0.0.0.0:8000
```

---

This architecture provides a solid foundation for a modern GraphQL-powered food ordering application with React and Django. The separation of concerns, proper data normalization with Relay, and mutation handling make it scalable and maintainable.
