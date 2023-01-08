import { Typography } from '@material-ui/core';
import React from 'react';
import { useNavbarStyles } from '../../styles';

function NotificationTooltip({ notifications }) {
  const classes = useNavbarStyles();
  const followCount = countNotifications('follow');
  const likeCount = countNotifications('like');

  function countNotifications(notificationType) {
    return notifications.filter(({ type }) => type === notificationType).length;
  }

  return (
    <div className={classes.tooltipContainer}>
      {followCount > 0 && (
        <div className={classes.tooltip}>
          <span aria-label='Followers' className={classes.followers} />
          <Typography>1</Typography>
        </div>
      )}
      {likeCount && (
        <div className={classes.tooltip}>
          <span aria-label='Likes' className={classes.likes} />
          <Typography>1</Typography>
        </div>
      )}
    </div>
  );
}

export default NotificationTooltip;
