import { Dialog, Zoom, Button, Divider } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { defaultPost } from '../../data';
import { useOptionsDialogStyles } from '../../styles';

function OptionsDialog({ onClose }) {
  const classes = useOptionsDialogStyles();

  return (
    <Dialog
      open
      classes={{ scrollPaper: classes.dialogScrollPaper }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <Button className={classes.redButton}>Unfollow</Button>
      <Divider />
      <Button className={classes.button}>
        <Link className={classes.link} to={`/p/${defaultPost.id}`}>
          Go to post
        </Link>
      </Button>
      <Divider />
      <Button className={classes.button}>Share</Button>
      <Divider />
      <Button className={classes.button}>Copy Link</Button>
      <Divider />
      <Button className={classes.button} onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}

export default OptionsDialog;
