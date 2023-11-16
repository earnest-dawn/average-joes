const UserFragment = graphql`
    fragment UserFragment on User {
        id
        username
        email
        friends {
            ...FriendFragment
        }
    }
`;
