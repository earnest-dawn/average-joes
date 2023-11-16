const MenuItemsFragment = graphql`
    fragment MenuItemsFragment on MenuItems {
        id
        name
        ingredients
        calories
        price
        caption
    }
`;
