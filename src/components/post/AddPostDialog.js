import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos, PinDrop } from '@material-ui/icons';
import React from 'react';
// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { useAddPostDialogStyles } from '../../styles';
import { UserContext } from '../../App';
import serialize from '../../utils/serialize';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function AddPostDialog({ media, handleClose }) {
  const classes = useAddPostDialogStyles();
  const { me } = React.useContext(UserContext);
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState(initialValue);
  const [location, setLocation] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  function handleSharePost() {
    setSubmitting(true);
  }

  return (
    <Dialog fullScreen open onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ArrowBackIos onClick={handleClose} />
          <Typography align='center' variant='body1' className={classes.title}>
            New Post
          </Typography>
          <Button
            color='primary'
            className={classes.share}
            disabled={submitting}
          >
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <Paper className={classes.paper}>
        <Avatar src={me.profile_image} />

        <Slate
          editor={editor}
          value={initialValue}
          onChange={(value) => setValue(value)}
        >
          <Editable
            className={classes.editor}
            placeholder='Write your caption...'
          />
        </Slate>
        <Avatar
          src={URL.createObjectURL(media)}
          className={classes.avatarLarge}
          variant='square'
        />
      </Paper>
      <TextField
        fullWidth
        placeholder='Location'
        InputProps={{
          classes: {
            root: classes.root,
            input: classes.input,
            underline: classes.underline,
          },
          startAdornment: (
            <InputAdornment>
              <PinDrop />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setLocation(event.target.value)}
      />
    </Dialog>
  );
}

export default AddPostDialog;
