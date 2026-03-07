const UserFragment = graphql`
    fragment UserFragment on UserType {
        id
        username
        email
    }
`;

export default UserFragment;
