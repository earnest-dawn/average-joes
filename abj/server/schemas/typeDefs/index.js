const typeDefs = `
  type MenuItem {
    id: ID!
    name: String!
    ingredients: String!
    calories: Int
    price: Int!
    caption: String!
    image: String!
  }

  type Friend {
    id: ID!
    username: String!
  }

  type Combo {
    id: ID!
    title: String!
    menuItems: [MenuItem]
    price: Int
  }

  type User {
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
    price: Int!
    clientMutationId: String
  }

  type CreateComboPayload {
    code: String!
    success: Boolean!
    message: String!
    combo: Combo
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
    combo: Combo
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
    combo: Combo
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
    combo: Combo
    clientMutationId: String
  }

  input CreateMenuItemInput {
    title: String!
    name: String!
    ingredients: String!
    calories: Int
    price: Int!
    image: String!
    clientMutationId: String
  }

  type CreateMenuItemPayload {
    code: String!
    success: Boolean!
    message: String!
    menuItem: MenuItem
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
    menuItem: MenuItem
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
    menuItem: MenuItem
    clientMutationId: String
  }

  type Query {
    me: User
    menuItems: [MenuItem]
    users: [User]
    combos: [Combo]
  }

  type Mutation {
    register(input: RegisterInput!): RegisterPayload
    login(input: LoginInput!): LoginPayload
    createCombos(title: CreateComboInput!): CreateComboPayload
    deleteCombos(title: DeleteComboInput!): DeleteComboPayload
    addToCombos(title: AddToComboInput!): AddToComboPayload
    removeFromCombos(title: RemoveFromComboInput!): RemoveFromComboPayload
    createMenuItems(name: CreateMenuItemInput!): CreateMenuItemPayload
    deleteMenuItems(name: DeleteMenuItemInput!): DeleteMenuItemPayload
    addMenuItems(name: AddMenuItemInput!): AddMenuItemPayload
  }

  scalar ID
`;

module.exports = typeDefs;
