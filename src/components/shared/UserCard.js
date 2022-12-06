import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { useUserCardStyles } from '../../styles';
import { Link } from 'react-router-dom';
import { defaultUser } from '../../data';

function UserCard({ user = defaultUser, avatarSize = 44 }) {
  const classes = useUserCardStyles({ avatarSize });
  const { username, name, profile_image } = user;
  return (
    <div className={classes.wrapper}>
      <Link to={`/${username}`}>
        <Avatar
          className={classes.avatar}
          src={profile_image}
          alt='User avatar'
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${username}`} className={classes.link}>
          <Typography variant='subtitle2' className={classes.typography}>
            {username}
          </Typography>
        </Link>
        <Typography
          color='textSecondary'
          variant='body2'
          className={classes.typography}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
