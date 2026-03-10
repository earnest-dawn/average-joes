import graphql from 'babel-plugin-relay/macro';

const UserFragment = graphql`
    fragment UserFragment on User {
        id
        username
        email
    }
`;

export default UserFragment;
