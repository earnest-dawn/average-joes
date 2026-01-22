const RatingFragment = graphql`
  fragment RatingFragment on Rating {
    id
    emoji
    ratingText
    createdAt
    images
    user {
      username
      }
    ratedId {
      __typename
      ... on MenuItems {
        name
      }
      ... on Combos {
        title
      }
    }
  }
`;
