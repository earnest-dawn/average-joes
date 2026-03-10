import { graphql } from "babel-plugin-relay/macro";

// --- AUTHENTICATION MUTATIONS ---

export const CreateUserMutation = graphql`
  mutation mutationsCreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
      user {
        id
        username
      }
      token
    }
  }
`;

export const LoginMutation = graphql`
  mutation mutationsLoginMutation($input: LoginInput!) {
    login(input: $input) {
      code
      success
      message
      token
      user {
        id
        username
        role
      }
      clientMutationId
    }
  }
`;

// --- RESTAURANT MUTATIONS ---

export const CreateRestaurantMutation = graphql`
  mutation mutationsCreateRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      code
      success
      message
      restaurant {
        id
        name
        category
        location
      }
      clientMutationId
    }
  }
`;

export const UpdateRestaurantMutation = graphql`
  mutation mutationsUpdateRestaurantMutation($input: UpdateRestaurantInput!) {
    updateRestaurant(input: $input) {
      code
      success
      message
      restaurant {
        id
        name
        description
        phoneNumber
        email
        website
        category
        isVerified
        averageRating
        location
        images
        owner {
  id
  username
}
        hours
      }
      clientMutationId
    }
  }
`;

export const DeleteRestaurantMutation = graphql`
  mutation mutationsDeleteRestaurantMutation($input: DeleteRestaurantInput!) {
    deleteRestaurant(input: $input) {
      code
      success
      message
      restaurant {
        id
        name
      }
      clientMutationId
    }
  }
`;

export const ClaimRestaurantOwnershipMutation = graphql`
  mutation mutationsClaimRestaurantOwnershipMutation(
    $input: ClaimRestaurantOwnershipInput!
  ) {
    claimRestaurantOwnership(input: $input) {
      code
      success
      message
      restaurant {
        id
        name
        owner {
          id
          username
        }
      }
      clientMutationId
    }
  }
`;

// --- MENU ITEM MUTATIONS ---

export const CreateMenuItemsMutation = graphql`
  mutation mutationsCreateMenuItemsMutation($input: CreateMenuItemInput!) {
    createMenuItems(input: $input) {
      code
      success
      message
      menuItem {
        id
        name
        price
        category
        inStock
      }
      clientMutationId
    }
  }
`;

export const UpdateMenuItemMutation = graphql`
  mutation mutationsUpdateMenuItemMutation($input: UpdateMenuItemInput!) {
    updateMenuItem(input: $input) {
      code
      success
      message
      menuItem {
        id
        name
        price
        inStock
      }
      clientMutationId
    }
  }
`;

export const DeleteMenuItemsMutation = graphql`
  mutation mutationsDeleteMenuItemsMutation($input: DeleteMenuItemInput!) {
    deleteMenuItems(input: $input) {
      code
      success
      message
      menuItem {
        id
        name
      }
      clientMutationId
    }
  }
`;

export const ToggleStockStatusMutation = graphql`
  mutation mutationsToggleStockStatusMutation($input: ToggleStockStatusInput!) {
    toggleStockStatus(input: $input) {
      code
      success
      message
      menuItem {
        id
        inStock
      }
      clientMutationId
    }
  }
`;

// --- COMBO MUTATIONS ---

export const CreateCombosMutation = graphql`
  mutation mutationsCreateCombosMutation($input: CreateCombosInput!) {
    createCombos(input: $input) {
      code
      success
      message
      combos {
        id
        title
        price
        originalPrice
      }
      clientMutationId
    }
  }
`;

export const EditCombosMutation = graphql`
  mutation mutationsEditCombosMutation($input: EditCombosInput!) {
    editCombos(input: $input) {
      code
      success
      message
      combos {
        id
        title
        price
        description
      }
      clientMutationId
    }
  }
`;

export const DeleteCombosMutation = graphql`
  mutation mutationsDeleteCombosMutation($input: DeleteCombosInput!) {
    deleteCombos(input: $input) {
      code
      success
      message
      combos {
        id
        title
      }
      clientMutationId
    }
  }
`;

// --- RATING MUTATIONS ---

export const CreateRatingMutation = graphql`
  mutation mutationsCreateRatingMutation($input: CreateRatingInput!) {
    createRating(input: $input) {
      code
      success
      message
      rating {
        id
        emoji
        ratingScore
        ratingText
        createdAt
      }
      clientMutationId
    }
  }
`;

export const DeleteRatingMutation = graphql`
  mutation mutationsDeleteRatingMutation($input: DeleteRatingInput!) {
    deleteRating(input: $input) {
      code
      success
      message
      rating {
        id
      }
      clientMutationId
    }
  }
`;

// --- CART & ORDER MUTATIONS ---

export const AddToCartMutation = graphql`
  mutation mutationsAddToCartMutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      code
      success
      message
      cart {
        id
        totalPrice
        items {
          id
          quantity
          unitPrice
          menuItem {
            name
          }
          combo {
            title
          }
        }
      }
      clientMutationId
    }
  }
`;

export const RemoveFromCartMutation = graphql`
  mutation mutationsRemoveFromCartMutation($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
      code
      success
      message
      cart {
        id
        totalPrice
      }
      clientMutationId
    }
  }
`;

export const CreateOrderMutation = graphql`
  mutation mutationsCreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      code
      success
      message
      order {
        id
        orderNumber
        totalPrice
        status
      }
      clientMutationId
    }
  }
`;

export const CheckoutMutation = graphql`
  mutation mutationsCheckoutMutation($input: CheckoutInput!) {
    checkout(input: $input) {
      code
      success
      message
      order {
        id
        orderNumber
        paymentStatus
        status
      }
      clientMutationId
    }
  }
`;

export const UpdateOrderStatusMutation = graphql`
  mutation mutationsUpdateOrderStatusMutation($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      code
      success
      message
      order {
        id
        status
      }
      clientMutationId
    }
  }
`;

export const DeleteOrderMutation = graphql`
  mutation mutationsDeleteOrderMutation($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      code
      success
      message
      order {
        id
      }
      clientMutationId
    }
  }
`;
