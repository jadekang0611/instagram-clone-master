import { Button } from "@material-ui/core";
import React from "react";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setFollowing] = React.useState(false);

  const followButton = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={() => setFollowing(true)}
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.button}
      onClick={() => setFollowing(false)}
    >
      Following
    </Button>
  );

  return isFollowing ? followButton : followButton;
}

export default FollowButton;
