import { graphql } from "babel-plugin-relay/macro";

export const REGISTER = graphql`
  mutation mutationsRegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        password
        email
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
  mutation mutationsAddToComboMutation($input: AddToCombosInput!) {
    addToCombos(input: $input) {
      code
      success
      message
    }
  }
`;

export const REMOVE_FROM_COMBO = graphql`
  mutation mutationsRemoveFromComboMutation($input: RemoveFromCombosInput!) {
    removeFromCombos(input: $input) {
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
  mutation mutationsAddMenuItemMutation($input: AddMenuItemInput!) {
    addMenuItems(input: $input) {
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