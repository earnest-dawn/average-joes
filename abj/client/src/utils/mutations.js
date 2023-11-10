import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register($username: String!, $password: String!, $email: String!) {
        register(username: $username, password: $password, email: $email) {
            token
            user {
                username
                password
                email
                _id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                username
                password
                friends {
                    username
                }
                email
                _id
            }
        }
    }
`;

export const CREATE_COMBO = gql`
    mutation createCombo($title: String!, $menuItems: [ID]!, $price: Int!) {
        createCombo($title: title, $menuItems: menuItems, $price: Int!) {
            title
            menuItems {
                _id: ID!
    name: String!
    ingredients: String!
    calories: String
    price: Int!
    caption: String!
            }
        }
    }
`;

export const DELETE_Combo = gql`
    mutation deleteCombo($deleteComboId: ID!) {
        deleteCombo(id: $deleteComboId) {
            title
            menuItems {
               _id: ID!
    name: String!
    ingredients: String!
    calories: String
    price: Int!
    caption: String!
            }
        }
    }
`;

export const ADD_TO_Combo = gql`
    mutation addToCombo($comboId: ID!, $menuItems: ID!) {
        addToCombo(comboId: $comboId, menuItems: $menuItems) {
            title
            menu_id: ID!
    name: String!
    ingredients: String!
    calories: String
    price: Int!
    caption: String!
            }
        }
    }
`;
export const REMOVE_FROM_COMBO = gql`
    mutation removeFromCombo($comboId: ID!, $menuItems: ID!) {
        removeFromCombo(comboId: $comboId, menuItems: $menuItems) {
            title
            menuItems {
                _id: ID!
    name: String!
    ingredients: String!
    calories: String
    price: Int!
    caption: String!
            }
        }
    }
`;
