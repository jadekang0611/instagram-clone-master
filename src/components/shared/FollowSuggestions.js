import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LoadingLargeIcon } from '../../icons';
import { useFollowSuggestionsStyles } from '../../styles';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';
import { UserContext } from '../../App';
import { SUGGEST_USER } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

function FollowSuggestions({ hideHeader }) {
  const { followerIds, me } = React.useContext(UserContext);
  const variables = {
    limit: 20,
    followerIds,
    createdAt: me.created_at,
  };
  const { data, loading } = useQuery(SUGGEST_USER, { variables });
  const classes = useFollowSuggestionsStyles();

  return (
    <div className={classes.container}>
      {!hideHeader && (
        <Typography
          color='textSecondary'
          variant='subtitle2'
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
      )}
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={classes.slide}
          dots={false}
          infinite
          speed={1000}
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing='ease-in-out'
        >
          {data.instagram_users.map((user) => (
            <FollowSuggestionsItem key={user.id} user={user} />
          ))}
        </Slider>
      )}
    </div>
  );
}

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name, id } = user;

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${username}`}>
          <Avatar src={profile_image} alt={`${username}'s profile`} />
        </Link>
        <Link to={`/${username}`} className={classes.link}>
          <Typography
            className={classes.text}
            align='center'
            variant='subtitle2'
          >
            {username}
          </Typography>
        </Link>
        <Typography
          color='textSecondary'
          variant='body2'
          className={classes.text}
          align='center'
        >
          {name}
        </Typography>
        <FollowButton id={id} side={false} />
      </div>
    </div>
  );
}

export default FollowSuggestions;
