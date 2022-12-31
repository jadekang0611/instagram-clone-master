import { gql } from '@apollo/client';

export const ME = gql`
  subscription Me($userId: String) {
    users(where: { user_id: { _eq: $userId } }) {
      id
      user_id
      name
      username
      profile_image
      last_checked
    }
  }
`;
