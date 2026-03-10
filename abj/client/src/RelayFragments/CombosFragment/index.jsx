import graphql from 'babel-plugin-relay/macro';

const CombosFragment = graphql`
    fragment CombosFragment on Combos {
        id
        title
        menuItems {
            ...MenuItemsFragment
        }
        price
    }
`;
