import React from 'react';
import Post from '../components/post/Post';
import Layout from '../components/shared/Layout';
import { useParams } from 'react-router-dom';
import MorePostsFromUser from '../components/post/MorePostsFromUser';

function PostPage() {
  const { postId } = useParams();
  return (
    <Layout>
      <Post postId={postId} />
      <MorePostsFromUser postId={postId} />
    </Layout>
  );
}

export default PostPage;
