import { gql } from '@apollo/client';

export const CHECK_IF_USERNAME_TAKEN = gql`
  query CheckIfUsernameTaken($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query GetUserEmail($input: String!) {
    users(
      where: {
        _or: [{ username: { _eq: $input } }, { phone_number: { _eq: $input } }]
      }
    ) {
      email
    }
  }
`;

export const GET_EDIT_USER_PROFILE = gql`
  query getEditUserProfile($id: uuid!) {
    users_by_pk(id: $id) {
      id
      username
      name
      phone_number
      profile_image
      user_id
      website
      email
      bio
    }
  }
`;
