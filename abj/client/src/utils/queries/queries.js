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
  query queriesRatingQuery {
    ratings {
      _id
      emoji
      ratingText
      createdAt
      images
      user {
        id
        username
      }
      ratedId {
        ... on MenuItems {
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
        ... on Combos {
          id
          title
          price
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
    }
  }
`;

export const QUERY_RESTAURANTS = gql`
  query queriesRestaurantQuery {
    restaurants {
      id
      name
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
        category
        location
        contactInfo
        hours
        images
      }
    }
  }
`;
