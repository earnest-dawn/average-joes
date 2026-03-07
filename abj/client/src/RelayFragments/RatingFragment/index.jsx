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
  }
`;

export default RatingFragment;
