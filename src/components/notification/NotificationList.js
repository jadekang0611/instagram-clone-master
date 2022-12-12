import React from "react";
import { useNotificationListStyles } from "../../styles";
import { defaultNotifications } from "../../data";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import FollowButton from "../shared/FollowButton";
import useOutsideClick from "@rooks/use-outside-click";

function NotificationList({ handleHideList }) {
  const listContainerRef = React.useRef();
  const classes = useNotificationListStyles();
  useOutsideClick(listContainerRef, handleHideList);
  return (
    <div className={classes.listContainer} container ref={listContainerRef}>
      {defaultNotifications.map((notification) => {
        const isLike = notification.type === "like";
        const isFollow = notification.type === "follow";

        return (
          <Grid key={notification.id} item className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar
                  src={notification.user.profile_image}
                  alt="User avatar"
                />
              </div>
              <div className={classes.nameWrapper}>
                <Link
                  className={classes.link}
                  to={`/${notification.user.username}`}
                >
                  <Typography variant="body1" className={classes.link}>
                    {notification.user.username}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {isLike && `likes your photo. 4d`}
                  {isFollow && `started following you. 5d`}
                </Typography>
              </div>
            </div>
            <div>
              {isLike && (
                <Link
                  className={classes.link}
                  to={`/p/${notification.post.id}`}
                >
                  <Avatar src={notification.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton />}
            </div>
          </Grid>
        );
      })}
    </div>
  );
}

export default NotificationList;
