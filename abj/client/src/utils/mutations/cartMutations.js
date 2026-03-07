import { graphql } from "babel-plugin-relay/macro";

/**
 * Mutation to add an item to the user's shopping cart
 * Requires authentication
 */
export const ADD_TO_CART = graphql`
  mutation cartMutationsAddToCartMutation(
    $menuItemId: UUID
    $comboId: UUID
    $quantity: Int
  ) {
    addToCart(menuItemId: $menuItemId, comboId: $comboId, quantity: $quantity) {
      cart {
        id
        total
        items {
          id
          quantity
          unitPrice
          menuItem {
            id
            name
            price
            caption
            images
          }
          combo {
            id
            title
            price
          }
        }
      }
      success
      message
    }
  }
`;

/**
 * Mutation to remove an item from the user's shopping cart
 * Requires authentication
 */
export const REMOVE_FROM_CART = graphql`
  mutation cartMutationsRemoveFromCartMutation($cartItemId: UUID!) {
    removeFromCart(cartItemId: $cartItemId) {
      cart {
        id
        total
        items {
          id
          quantity
          unitPrice
          menuItem {
            id
            name
          }
          combo {
            id
            title
          }
        }
      }
      success
    }
  }
`;

/**
 * Query to get current user's cart
 * Requires authentication
 */
export const GET_MY_CART = graphql`
  query cartMutationsGetMyCartQuery {
    myCart {
      id
      total
      items {
        id
        quantity
        unitPrice
        specialInstructions
        menuItem {
          id
          name
          price
          caption
          images
          category
        }
        combo {
          id
          title
          price
        }
      }
    }
  }
`;
