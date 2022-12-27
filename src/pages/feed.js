import React from 'react';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import { getDefaultPost } from '../data';
import { Hidden } from '@material-ui/core';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestion from '../components/feed/FeedSideSuggestions';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  let loading = false;
  const [isEndOfFeed] = React.useState(false);
  if (loading) return <LoadingScreen />;

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map(
            (post, index) => (
              <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                <FeedPost key={post.id} post={post} index={index} />
              </React.Suspense>
            )
          )}
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
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
