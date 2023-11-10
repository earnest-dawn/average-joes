const typeDefs = `
  type MenuItems {
    _id: ID!
    name: String!
    ingredients: String!
    calories: Int
    price: Int!
    caption: String!  }

    type Friend {
      username: String!
    }

  type Combos {
    title: String!
    _id:ID!
    menuItems: [MenuItems]
    price: Int
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    friends: [Friend]
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
    menuItems: [MenuItems]
    users: [User]
    combos: [Combos]
  }
  type Mutation {
    register(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    createCombos(title: String!, menuItems: [ID]!, price: Int!): Combos
    deleteCombos(id: ID!): Combos
    addToCombos (combosId: ID!, menuItems: ID!): Combos
    removeFromCombos (combosId: ID!, menuItems: ID!): Combos
  }
`;

module.exports = typeDefs;
// deleteUser(username: String,): User
