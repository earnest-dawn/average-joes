const typeDefs = `
  interface Node {
  id: ID
}
  type MenuItems implements Node {
    id: ID
    name: String!
    ingredients: String!
    calories: Int
    price: Float!
    caption: String!
    images: [String]
    ratings: [Rating]
    category: String
    inStock: Boolean
  }
    
  union RatedObject = MenuItems | Combos
  
  type Rating  implements Node {
    id: ID
    emoji: String
    ratingText: String
    user: User
    createdAt: String
    images: [String]
    ratedId: RatedObject
  }
    
  type Friend implements Node  {
    id: ID
    username: String!
  }

  type Combos implements Node  {
    id: ID
    title: String!
    menuItems: [MenuItems]
    rating: [Rating]
    price: Float!
  }

  type User implements Node  {
    id: ID
    username: String!
    password: String!
    email: String!
    friends: [Friend]
    cart: Cart
  }

  type AuthPayload {
    token: ID
    user: User
  }

  input CreateRatingInput {
    ratedId: ID
    onModel: String!
    emoji: String!
    ratingText: String
    images: [String]
    clientMutationId: String
  }

  type CreateRatingPayload{
    code: String!
    success: Boolean!
    message: String!
    rating: Rating
    clientMutationId: String
  }

  input DeleteRatingInput {
    id: ID
    name: String!
    clientMutationId: String
  }

  type DeleteRatingPayload {
    code: String!
    success: Boolean!
    message: String!
    rating: Rating
    clientMutationId: String
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
    clientMutationId: String
  }

  type RegisterPayload {
    code: String!
    success: Boolean!
    message: String!
    token: ID
    user: User
    clientMutationId: String
  }

  input LoginInput {
    username: String!
    password: String!
    clientMutationId: String
  }

  type LoginPayload {
    code: String!
    success: Boolean!
    message: String!
    token: ID
    user: User
    clientMutationId: String
  }

  input CreateCombosInput {
    title: String!
    menuItems: [ID]!
    price: Float!
    clientMutationId: String
  }

  type CreateCombosPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input DeleteCombosInput {
    id: ID
    name: String!
    clientMutationId: String
  }

  type DeleteCombosPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input EditCombosInput {
    comboId: ID
    menuItemId: ID
    clientMutationId: String
  }

  type EditCombosPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input RemoveFromCombosInput {
    comboId: ID
    menuItemId: ID
    clientMutationId: String
  }

  type RemoveFromCombosPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input CreateMenuItemInput {  
    name: String!
    ingredients: String!
    calories: Int
    price: Float!
    images: [String]
    category: String!
    clientMutationId: String
  }

  type CreateMenuItemPayload {
    menuItem: MenuItems
    code: String!
    success: Boolean!
    message: String!
    clientMutationId: String
  }

  input DeleteMenuItemInput {
    name: String!
    clientMutationId: String
  }

  type DeleteMenuItemPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
    clientMutationId: String
  }

  input EditMenuItemInput {
    comboId: ID
    name: String!
    clientMutationId: String
  }

  type EditMenuItemPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
    clientMutationId: String
  }

type Restaurant implements Node {
    id: ID
    name:  String!
    menuItems: [MenuItems]
    combos: [Combos]
    ratings: [Rating]
    category: String!
    location: String!
    contactInfo: String!
    images: [String]
    hours: String
  }

  input CreateRestaurantInput {
    name: String!
    menuItems: [ID]
    combos: [ID]
    category: String!
    location: String!
    contactInfo: String!
    images: [String]
      hours: String
    clientMutationId: String
  }
  type CreateRestaurantPayload {
    code: String!
    success: Boolean!
    message: String!
    restaurant: Restaurant
  }
    input DeleteRestaurantInput {
    id: ID
    name: String!
    clientMutationId: String
  }

  type DeleteRestaurantPayload {
    code: String!
    success: Boolean!
    message: String!
    restaurant: Restaurant
    clientMutationId: String
  }
    
  input AddRestaurantInput {
    name: String!
    menuItems: [ID]
    combos: [ID]
    ratings: [ID]
    category: String!
    location: String!
    contactInfo: String!
    images: [String]
      hours: String

    clientMutationId: String
  }

  type AddRestaurantPayload {
    code: String!
    success: Boolean!
    message: String!
    restaurant: Restaurant
    clientMutationId: String
  }

  input EditRestaurantInput {
    id: ID
    name: String
    menuItems: [ID]
    combos: [ID]
    ratings: [ID]
    category: String
    location: String
    contactInfo: String
    images: [String]
      hours: String

    clientMutationId: String
  }

  type EditRestaurantPayload {
    code: String!
    success: Boolean!
    message: String!
    restaurant: Restaurant
    clientMutationId: String
  }

  input ToggleStockStatusInput {
    inStock: Boolean!
    id: ID
    clientMutationId: String
  }


 type ToggleStockStatusPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
    clientMutationId: String
  }


type CartItem implements Node {
id: ID
  menuItem: MenuItems
  combo: Combos
  quantity: Int
}

type Cart implements Node {
  id: ID
  items: [CartItem]
  totalPrice: Float
}

input AddToCartInput {
  id: ID!
  quantity: Int!
  totalPrice: Float
  clientMutationId: String
}
type AddToCartPayload  {
  code: String!
  success: Boolean!
  message: String!
  clientMutationId: String
}

input RemoveFromCartInput {
  itemId: [ID]
  clientMutationId: String
}
type RemoveFromCartPayload   {
  code: String!
  success: Boolean!
  message: String!
  clientMutationId: String
}

type Query {
  node(id: ID): Node
  me: User
  menuItems: [MenuItems]
  users: [User]
  combos: [Combos]
  ratings: [Rating]
  restaurants: [Restaurant]
  friends: [Friend]
  cart: Cart
}

type Mutation {
  register(input: RegisterInput!): RegisterPayload
  login(input: LoginInput!): LoginPayload
  createCombos(input: CreateCombosInput!): CreateCombosPayload
  deleteCombos(input: DeleteCombosInput!): DeleteCombosPayload
  editCombos(input: EditCombosInput!): EditCombosPayload
  createMenuItems(input: CreateMenuItemInput!): CreateMenuItemPayload
  deleteMenuItems(input: DeleteMenuItemInput!): DeleteMenuItemPayload
  editMenuItems(input: EditMenuItemInput!): EditMenuItemPayload
  createRating(input: CreateRatingInput!): CreateRatingPayload
  deleteRating(input: DeleteRatingInput!): DeleteRatingPayload
  toggleStockStatus(input: ToggleStockStatusInput!): ToggleStockStatusPayload
  createRestaurant(input: CreateRestaurantInput!): CreateRestaurantPayload
  editRestaurant(input: EditRestaurantInput!): EditRestaurantPayload
  deleteRestaurant(input: DeleteRestaurantInput!): DeleteRestaurantPayload
  addRestaurant(input: AddRestaurantInput!): AddRestaurantPayload
  addToCart(input: AddToCartInput!): User
  removeFromCart(input: RemoveFromCartInput!): RemoveFromCartPayload
  
}
scalar Float
scalar Int
scalar String
scalar Boolean

  scalar ID
`;

module.exports = typeDefs;
