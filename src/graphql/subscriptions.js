import { gql } from '@apollo/client';

export const ME = gql`
  subscription me($userId: String) {
    instagram_users(where: { user_id: { _eq: $userId } }) {
      id
      user_id
      name
      username
      profile_image
      last_checked
      bio
      phone_number
      website
    }
  }
`;
