import { graphql } from '@apollo/client';

export const QUERY_MENU_ITEMS = graphql`
    query queriesMenuItemsQuery {
        menuItems {
            id
            name
            ingredients
            calories
            price
            caption
        }
    }
`;

export const QUERY_COMBOS = graphql`
    query queriesCombosQuery {
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
        }
    }
`;

export const QUERY_USERS = graphql`
    query queriesUsersQuery {
        users {
            id
            username
            email
        }
    }
`;

export const ME = graphql`
    query queriesMeQuery {
        me {
            username
            friends {
                username
            }
        }
    }
`;
