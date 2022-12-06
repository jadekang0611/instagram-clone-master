import React from 'react';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import { defaultPost, getDefaultPost } from '../data';
import FeedPost from '../components/feed/FeedPost';
import { Hidden } from '@material-ui/core';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestion from '../components/feed/FeedSideSuggestions';

function FeedPage() {
  const classes = useFeedPageStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
        {/* Sidebar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard avatarSize={50} />
              <FeedSideSuggestion />
            </div>
          </div>
        </Hidden>
      </div>
    </Layout>
  );
}

export default FeedPage;
