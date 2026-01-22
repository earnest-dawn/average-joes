const typeDefs = `
  interface Node {
  id: ID!
}
  type MenuItems implements Node {
    id: ID!
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
    id: ID!
    emoji: String
    ratingText: String
    user: User
    createdAt: String
    images: [String]
    ratedId: RatedObject
  }
    
  type Friend implements Node  {
    id: ID!
    username: String!
  }

  type Combos implements Node  {
    id: ID!
    title: String!
    menuItems: [MenuItems]
    price: Float!
  }

  type User implements Node  {
    id: ID!
    username: String!
    password: String!
    email: String!
    friends: [Friend]
  }

  type AuthPayload {
    token: ID!
    user: User
  }

  input CreateRatingInput {
    ratedId: ID!
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
    id: ID!
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

  input CreateComboInput {
    title: String!
    menuItems: [ID]!
    price: Float!
    clientMutationId: String
  }

  type CreateComboPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input DeleteComboInput {
    id: ID!
    name: String!
    clientMutationId: String
  }

  type DeleteComboPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input AddToComboInput {
    comboId: ID!
    menuItemId: ID!
    clientMutationId: String
  }

  type AddToComboPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combos
    clientMutationId: String
  }

  input RemoveFromComboInput {
    comboId: ID!
    menuItemId: ID!
    clientMutationId: String
  }

  type RemoveFromComboPayload {
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
    input: ID!
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
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

  input AddMenuItemInput {
    comboId: ID!
    name: String!
    clientMutationId: String
  }

  type AddMenuItemPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
    clientMutationId: String
  }

type Restaurant implements Node {
    id: ID!
    name:  String!
    menuItems: [MenuItems]
    combos: [Combos]
    ratings: [Rating]
    category: String!
    location: String!
    contactInfo: String!
    images: [String]
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
    id: ID!
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
    id: ID!
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
    id: ID!
    clientMutationId: String
  }


 type ToggleStockStatusPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItems
    clientMutationId: String
  }

  type Query {
    me: User
    menuItems: [MenuItems]
    users: [User]
    combos: [Combos]
    ratings: [Rating]
    restaurants: [Restaurant]
    friends: [Friend]
  }

  type Mutation {
    register(input: RegisterInput!): RegisterPayload
    login(input: LoginInput!): LoginPayload
    createCombos(input: CreateComboInput!): CreateComboPayload
    deleteCombos(input: DeleteComboInput!): DeleteComboPayload
    addToCombos(input: AddToComboInput!): AddToComboPayload
    removeFromCombos(input: RemoveFromComboInput!): RemoveFromComboPayload
    createMenuItems(input: CreateMenuItemInput!): CreateMenuItemPayload
    deleteMenuItems(input: DeleteMenuItemInput!): DeleteMenuItemPayload
    addMenuItems(input: AddMenuItemInput!): AddMenuItemPayload
    createRating(input: CreateRatingInput!): CreateRatingPayload
    deleteRating(input: DeleteRatingInput!): DeleteRatingPayload
    toggleStockStatus(input: ToggleStockStatusInput!): ToggleStockStatusPayload
    createRestaurant(input: CreateRestaurantInput!): CreateRestaurantPayload
    editRestaurant(input: EditRestaurantInput!): EditRestaurantPayload
    deleteRestaurant(input: DeleteRestaurantInput!): DeleteRestaurantPayload
    addRestaurant(input: AddRestaurantInput!): AddRestaurantPayload
  }

  scalar ID
`;

module.exports = typeDefs;
