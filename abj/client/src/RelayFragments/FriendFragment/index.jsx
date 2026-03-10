import graphql from 'babel-plugin-relay/macro';
const FriendFragment = graphql`
    fragment FriendFragment on Friend {
        id
    }
`;

export default FriendFragment;
