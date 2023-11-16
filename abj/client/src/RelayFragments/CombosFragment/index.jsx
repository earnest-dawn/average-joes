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
