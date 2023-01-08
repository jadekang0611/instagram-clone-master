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

export const GET_POST = gql`
  subscription getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      id
      caption
      created_at
      media
      location
      user {
        name
        id
        username
        profile_image
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
      }
      saved_posts {
        id
        user_id
      }
      comments(
        order_by: { created_at: desc, id: asc, user: { username: asc } }
      ) {
        content
        created_at
        user {
          username
          profile_image
        }
      }
    }
  }
`;
