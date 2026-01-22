import { graphql } from 'babel-plugin-relay/macro';
const OrderOnlinePageFragment=graphql`
  fragment OrderOnlinePageFragment on Query {
    menuItems {
      ...MenuItemsFragment
}
      ratings {
        ...RatingFragment
      }
      friends {
        ...FriendFragment
      }
    
  }`;
