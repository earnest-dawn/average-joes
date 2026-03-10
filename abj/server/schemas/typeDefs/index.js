const typeDefs = `  
# 1. SCALARS
  scalar UUID
  scalar Decimal
  scalar DateTime

  # 2. ENUMS
  enum UserRole { CUSTOMER RESTAURANT_OWNER ADMIN MODERATOR }
  enum RestaurantCategory { ITALIAN CHINESE MEXICAN AMERICAN INDIAN THAI JAPANESE MEDITERRANEAN SOUL BBQ }
  enum MenuItemCategory { ENTREE entree SIDE DRINK DESSERT APPETIZER }
  enum RatingEmoji { A_ A__1 A__2 A__3 A__4 }
  enum OrderStatus { PENDING PREPARING READY COMPLETED CANCELLED REFUNDED }
  enum OrderPaymentStatus { PENDING PROCESSING COMPLETED FAILED REFUNDED }
  enum FriendStatus { PENDING ACCEPTED BLOCKED }
  enum CartItemType { MENUITEM COMBO }

  # 3. INTERFACES
  interface Node { id: ID! }
  interface MutationResponse { code: String!, success: Boolean!, message: String! }

  # 4. UNIONS
  union SearchResult = Restaurant | MenuItems
  union RatedObject = MenuItems | Combos | Restaurant

  # 5. OBJECT TYPES
  type User implements Node {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    bio: String
    isActive: Boolean!
    role: UserRole!
    friends: [Friend]
    cart: Cart
  }

  type Restaurant implements Node {
    id: ID!
    name: String!
    description: String!
    phoneNumber: String!
    email: String!
    website: String!
    category: RestaurantCategory!
    isVerified: Boolean!
    averageRating: Decimal!
    location: String!
    contactInfo: String!
    images: [String]
    hours: String
    owner: User!
    menuItems: [MenuItems]
    combos: [Combos]
    ratings: [Rating]
    myOrders: [Order]
  }

  type MenuItems implements Node {
    id: ID!
    name: String!
    description: String!
    category: MenuItemCategory!
    price: Decimal!
    discountPrice: Decimal
    calories: Int
    ingredients: String!
    isVegetarian: Boolean!
    isVegan: Boolean!
    images: [String]
    averageRating: Decimal!
    ratings: [Rating]
    restaurant: Restaurant
    caption: String
    inStock: Boolean!
  }

  type Combos implements Node {
    id: ID!
    title: String!
    description: String!
    menuItems: [MenuItems!]!
    price: Decimal!
    originalPrice: Decimal!
    isAvailable: Boolean!
    averageRating: Decimal!
    ratings: [Rating]
  }

  type Rating implements Node {
    id: ID!
    user: User!
    emoji: RatingEmoji!
    title: String!
    comment: String
    ratingScore: Int
    helpfulCount: Int
    createdAt: DateTime!
    ratedId: RatedObject
    ratingText: String
    images: [String]
  }

  type Friend implements Node {
    id: ID!
    username: String!
    user: User!
    friend: User!
    status: FriendStatus!
    createdAt: DateTime!
  }

  type Cart implements Node {
    id: ID!
    user: User!
    items: [CartItem]
    totalPrice: Decimal
  }

  type CartItem implements Node {
    id: ID!
    menuItem: MenuItems
    combo: Combos
    quantity: Int!
    unitPrice: Decimal!
  }

  type Order implements Node {
    id: ID!
    orderNumber: String!
    customer: User
    restaurant: Restaurant!
    items: [OrderItem]!
    totalPrice: Decimal!
    status: OrderStatus!
    paymentStatus: OrderPaymentStatus!
    createdAt: DateTime!
  }

  type OrderItem {
    name: String!
    priceAtPurchase: Decimal!
    quantity: Int!
    total: Decimal!
  }

  # 6. MUTATION INPUTS & PAYLOADS
  input CreateUserInput { username: String!, firstName: String!, lastName: String!, password: String!, email: String!, clientMutationId: String }
  type CreateUserPlayload implements MutationResponse { code: String!, success: Boolean!, message: String!, token: String, user: User, clientMutationId: String }

  input LoginInput { username: String!, password: String!, clientMutationId: String }
  type LoginPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, token: String, user: User, clientMutationId: String }

  input ToggleStockStatusInput { id: ID!, inStock: Boolean!, clientMutationId: String }
  type ToggleStockStatusPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, menuItem: MenuItems, clientMutationId: String }

  input CreateMenuItemInput { name: String!, description: String!, ingredients: String!, calories: Int, price: Decimal!, category: MenuItemCategory!, isVegetarian: Boolean = false, isVegan: Boolean = false, images: [String], restaurantId: ID!, clientMutationId: String }
  type CreateMenuItemPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, menuItem: MenuItems, clientMutationId: String }

  input DeleteMenuItemInput { name: String!, clientMutationId: String }
  type DeleteMenuItemPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, menuItem: MenuItems, clientMutationId: String }

  input UpdateMenuItemInput { id: ID!, name: String, price: Decimal, inStock: Boolean, clientMutationId: String }
  type UpdateMenuItemPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, menuItem: MenuItems, clientMutationId: String }

  input CreateCombosInput { title: String!, description: String!, menuItems: [ID!]!, price: Decimal!, originalPrice: Decimal!, clientMutationId: String }
  type CreateCombosPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, combos: Combos, clientMutationId: String }

  input DeleteCombosInput { title: String!, clientMutationId: String }
  type DeleteCombosPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, combos: Combos, clientMutationId: String }

  input EditCombosInput { title: String!, description: String, menuItems: [ID!], price: Decimal, clientMutationId: String }
  type EditCombosPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, combos: Combos, clientMutationId: String }

  input CreateRestaurantInput { name: String!, description: String!, category: RestaurantCategory!, location: String!, contactInfo: String!, phoneNumber: String!, email: String!, website: String!, images: [String], hours: String, clientMutationId: String }
  type CreateRestaurantPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, restaurant: Restaurant, clientMutationId: String }

  input UpdateRestaurantInput { id: ID!, name: String, description: String, category: RestaurantCategory, location: String, contactInfo: String, phoneNumber: String, email: String, website: String, images: [String], hours: String, clientMutationId: String }
  type UpdateRestaurantPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, restaurant: Restaurant, clientMutationId: String }

  input DeleteRestaurantInput { id: ID!, clientMutationId: String }
  type DeleteRestaurantPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, restaurant: Restaurant, clientMutationId: String }

  input ClaimRestaurantOwnershipInput { id: ID!, clientMutationId: String }
  type ClaimRestaurantOwnershipPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, restaurant: Restaurant, clientMutationId: String }

  input CreateRatingInput { ratedId: ID, emoji: RatingEmoji!, onModel: String!, ratingText: String, ratingScore: Int, images: [String], clientMutationId: String }
  type CreateRatingPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, rating: Rating, clientMutationId: String }

  input DeleteRatingInput { id: ID!, clientMutationId: String }
  type DeleteRatingPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, rating: Rating, clientMutationId: String }

  input AddToCartInput { id: ID!, itemType: CartItemType!, quantity: Int = 1, specialInstructions: String, clientMutationId: String }
  type AddToCartPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, cart: Cart, clientMutationId: String }

  input RemoveFromCartInput { id: [ID!]!, clientMutationId: String }
  type RemoveFromCartPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, cart: Cart, clientMutationId: String }

  input CreateOrderInput { restaurantId: ID!, items: [OrderItemInput!]!, clientMutationId: String }
  input OrderItemInput { menuItemId: ID!, quantity: Int!, specialInstructions: String }
  type CreateOrderPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, order: Order, clientMutationId: String }

  input CheckoutInput { restaurantId: ID!, clientMutationId: String }
  type CheckoutPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, order: Order, clientMutationId: String }

  input UpdateOrderStatusInput { orderId: ID!, status: OrderStatus!, clientMutationId: String }
  type UpdateOrderStatusPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, order: Order, clientMutationId: String }

  input DeleteOrderInput { orderId: ID!, clientMutationId: String }
  type DeleteOrderPayload implements MutationResponse { code: String!, success: Boolean!, message: String!, order: Order, clientMutationId: String }

  # 7. ROOT TYPES
  type Query {
    node(id: ID!): Node
    me: User
    users: [User]
    menuItems(restaurantId: UUID): [MenuItems!]
    combos: [Combos]
    ratings: [Rating]
    restaurants: [Restaurant]
    restaurantsByCategory(category: RestaurantCategory!): [Restaurant]
    friends: [Friend]
    cart: Cart
    orders: [Order]
    myOrders: [Order]
    globalSearch(searchTerm: String!): [SearchResult!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPlayload
    login(input: LoginInput!): LoginPayload
    toggleStockStatus(input: ToggleStockStatusInput!): ToggleStockStatusPayload
    createMenuItems(input: CreateMenuItemInput!): CreateMenuItemPayload
    deleteMenuItems(input: DeleteMenuItemInput!): DeleteMenuItemPayload
    updateMenuItems(input: UpdateMenuItemInput!): UpdateMenuItemPayload
    createCombos(input: CreateCombosInput!): CreateCombosPayload
    deleteCombos(input: DeleteCombosInput!): DeleteCombosPayload
    editCombos(input: EditCombosInput!): EditCombosPayload
    createRestaurant(input: CreateRestaurantInput!): CreateRestaurantPayload
    updateRestaurant(input: UpdateRestaurantInput!): UpdateRestaurantPayload
    deleteRestaurant(input: DeleteRestaurantInput!): DeleteRestaurantPayload
    claimRestaurantOwnership(input: ClaimRestaurantOwnershipInput!): ClaimRestaurantOwnershipPayload
    createRating(input: CreateRatingInput!): CreateRatingPayload
    deleteRating(input: DeleteRatingInput!): DeleteRatingPayload
    addToCart(input: AddToCartInput!): AddToCartPayload
    removeFromCart(input: RemoveFromCartInput!): RemoveFromCartPayload
    createOrder(input: CreateOrderInput!): CreateOrderPayload
    checkout(input: CheckoutInput!): CheckoutPayload
    updateOrderStatus(input: UpdateOrderStatusInput!): UpdateOrderStatusPayload
    deleteOrder(input: DeleteOrderInput!): DeleteOrderPayload
  }
`;

module.exports = typeDefs;