import { graphql } from 'babel-plugin-relay/macro';

export const REGISTER = graphql`
    mutation mutationsRegisterMutation($input: RegisterInput!) {
        register(input: $input) {
            token
            user {
                username
                password
                email
                id
            }
        }
    }
`;

export const LOGIN = graphql`
    mutation mutationsLoginMutation($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                username
                password
            }
            clientMutationId
        }
    }
`;

export const CREATE_COMBO = graphql`
    mutation mutationsCreateCombosMutation($input: CreateCombosInput!) {
        createCombos(input: $input) {
            code
            success
            message
            combos {
                id
                title
                menuItems {
                    id
                    name
                    ingredients
                    calories
                    price
                    caption
                }
                price
            }
            clientMutationId
        }
    }
`;

export const MUTATION_DELETE_COMBOS = graphql`
    mutation mutationsDeleteCombosMutation($input: DeleteCombosInput!) {
        deleteCombos(input: $input) {
            code
            success
            message
            combos {
                id
                title
                menuItems {
                    id
                    name
                    ingredients
                    calories
                    price
                    caption
                }
                price
            }
            clientMutationId
        }
    }
`;

export const ADD_TO_Combo = graphql`
    mutation mutationsAddToCombosMutation($input: AddToCombosInput!) {
        addToCombos(input: $input) {
            code
            success
            message
            combos {
                id
                title
                menuItems {
                    id
                    name
                    ingredients
                    calories
                    price
                    caption
                }
                price
            }
            clientMutationId
        }
    }
`;
export const REMOVE_FROM_COMBO = graphql`
    mutation mutationsRemoveFromCombosMutation($input: RemoveFromCombosInput!) {
        removeFromCombos(input: $input) {
            code
            success
            message
            combos {
                id
                title
                menuItems {
                    id
                    name
                    ingredients
                    calories
                    price
                    caption
                }
                price
            }
            clientMutationId
        }
    }
`;
