import { gql } from '@apollo/client';

export const CHECK_IF_USERNAME_TAKEN = gql`
  query CheckIfUsernameTaken($username: String!) {
    instagram_users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query GetUserEmail($input: String!) {
    instagram_users(
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
    instagram_users_by_pk(id: $id) {
      id
      username
      name
      email
      bio
      profile_image
      website
      phone_number
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String) {
    instagram_users(
      where: {
        _or: [{ username: { _ilike: $query } }, { name: { _ilike: $query } }]
      }
    ) {
      id
      username
      name
      profile_image
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      media
      location
      user_id
      caption
      created_at
    }
  }
`;
