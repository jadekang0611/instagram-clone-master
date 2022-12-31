import { gql } from '@apollo/client';

export const CHECK_IF_USERNAME_TAKEN = gql`
  query CheckIfUsernameTaken($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;
