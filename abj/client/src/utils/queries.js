import { gql } from '@apollo/client';

export const QUERY_MENU_ITEMS = gql`
    query menuItems {
        menuItems {
            _id
            name
            ingredients
            calories
            price
            caption
        }
    }
`;

export const QUERY_COMBOS = gql`
    query combos {
        combos {
            _id
            title
            menuItems {
                _id
                name
                ingredients
                calories
                price
                caption
            }
        }
    }
`;

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
        }
    }
`;

export const ME = gql`
    query me {
        me {
            username
            friends {
                username
            }
        }
    }
`;
