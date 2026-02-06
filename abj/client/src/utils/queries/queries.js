import { gql } from "@apollo/client";

export const QUERY_MENU_ITEMS = gql`
  query queriesMenuItemQuery {
    menuItems {
      id
      name
      ingredients
      calories
      price
      caption
      images
      category
      inStock
    }
  }
`;

export const QUERY_COMBOS = gql`
  query queriesComboQuery {
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
        images
        category
        inStock
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query queriesUserQuery {
    users {
      id
      username
      email
    }
  }
`;

export const ME = gql`
  query queriesMeQuery {
    me {
      username
      friends {
        username
      }
    }
  }
`;

export const QUERY_RATINGS = gql`
  query GetRatings {
    ratings {
      emoji
      ratingText
      ratedId {
        __typename 
        ... on MenuItems {
          name
          price
        }
        ... on Combos {
          title
          price
        }
        ... on Restaurant {
          name
          location
        }
      }
    }
  }
`;

export const QUERY_RESTAURANTS = gql`
  query queriesRestaurantQuery {
    restaurants {
      id
      name
      category
        location
        contactInfo
        hours
        images
        menuItems {
        id
        name
        ingredients
        calories
        price
        caption
        images
        category
        inStock
      }
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
          images
          category
          inStock
        }
        ratings {
          id
          emoji
          ratingText
          createdAt
          images
          user {
            id
            username
          }
        }
        
      }
    }
  }
`;

export const QUERY_CART_INFO = gql`
  query GetCartInfo {
    me {
      cart {
        items {
          id
          quantity
          menuItem {
            name
            price
          }
          combo {
            title
            price
          }
        }
        totalPrice
      }
    }
  }
`;

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    myOrders {
      id
      totalPrice
      status
      createdAt
      restaurant {
        name
      }
      items {
        quantity
        priceAtPurchase 
        itemReference { 
          name
        }
      }
    }
  }
`;