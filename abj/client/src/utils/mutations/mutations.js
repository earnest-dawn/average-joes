import { graphql } from "babel-plugin-relay/macro";

export const REGISTER = graphql`
  mutation mutationsRegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        
        email
      }
        code
      success
      message
    }
  }
`;

export const LOGIN = graphql`
  mutation mutationsLoginMutation($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        username
        
      }
        code
      success
      message
    }
  }
`;

export const CREATE_COMBO = graphql`
  mutation mutationsCreateComboMutation($input: CreateCombosInput!) {
    createCombos(input: $input) {
      code
      success
      message
    }
  }
`;

export const DELETE_COMBOS = graphql`
  mutation mutationsDeleteComboMutation($input: DeleteCombosInput!) {
    deleteCombos(input: $input) {
      code
      success
      message
    }
  }
`;

export const ADD_TO_Combo = graphql`
  mutation mutationsEditComboMutation($input: EditCombosInput!) {
    editCombos(input: $input) {
      code
      success
      message
    }
  }
`;



export const CREATE_MENU_ITEMS = graphql`
  mutation mutationsCreateMenuItemMutation($input: CreateMenuItemInput!) {
    createMenuItems(input: $input) {
      code
      success
      message
    }
  }
`;

export const DELETE_MENU_ITEMS = graphql`
  mutation mutationsDeleteMenuItemMutation($input: DeleteMenuItemInput!) {
    deleteMenuItems(input: $input) {
      code
      success
      message
    }
  }
`;

export const ADD_MENU_ITEM = graphql`
  mutation mutationsEditMenuItemMutation($input: EditMenuItemInput!) {
    editMenuItems(input: $input) {
      code
      success
      message
    }
  }
`;

export const TOGGLE_STOCK_STATUS = graphql`
  mutation mutationsToggleStockStatusMutation($input: ToggleStockStatusInput!) {
    toggleStockStatus(input: $input) {
      code
      success
      message
      menuItem {
        id
        inStock
      }
    }
  }
`;



export const CREATE_RATING = graphql`
  mutation mutationsCreateRatingMutation($input: CreateRatingInput!) {
    createRating(input: $input) {
      code
      success
      message
    }
  }
`;

export const DELETE_RATING = graphql`
  mutation mutationsDeleteRatingMutation($input: DeleteRatingInput!) {
    deleteRating(input: $input) {
      code
      success
      message
    }
  }

  
`;

export const CREATE_RESTAURANT = graphql`
  mutation mutationsCreateRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      code
      success
      message
    }
  }
`;

export const EDIT_RESTAURANT = graphql`
  mutation mutationsEditRestaurantMutation($input: EditRestaurantInput!) {
    editRestaurant(input: $input) {
      code
      success
      message
    }
  }
`;

export const DELETE_RESTAURANT = graphql`
  mutation mutationsDeleteRestaurantMutation($input: DeleteRestaurantInput!) {
    deleteRestaurant(input: $input) {
      code
      success
      message
    }
  }
`;

export const ADD_RESTAURANT = graphql`
  mutation mutationsAddRestaurantMutation($input: AddRestaurantInput!) {
    addRestaurant(input: $input) {
      code
      success
      message
    }
}`;

export const ADD_TO_CART = graphql`
  mutation mutationsAddToCartMutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      code
      success
      message
    }
}`;

export const REMOVE_FROM_CART = graphql`
  mutation mutationsRemoveFromCartMutation($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
      code
      success
      message
    }
}`;

export const CLAIM_OWNERSHIP = graphql`
  mutation mutationsClaimOwnershipMutation($input: ClaimRestaurantOwnershipInput!) {
    claimRestaurantOwnership(input: $input) {
      code
      success
      message
    }
  }
`;

export const CREATE_ORDER = graphql`
  mutation mutationsCreateOrderMutation($input:CreateOrderInput!) {
    createOrder(input: $input) {
       order{
       id
      totalPrice
      status} 
      code
      success
      message
    }
  }
`;

export const UPDATE_ORDER_STATUS = graphql`
  mutation mutationsUpdateOrderStatusMutation ($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      code
      success
      message
    }
  }
`;

export const DELETE_ORDER = graphql`
mutation mutationsDeleteBadOrderMutation ($input: DeleteOrderInput!) {
  deleteOrder(input: $input) {
    code
    success
    message
    order {
      id
    }
  }
}`;