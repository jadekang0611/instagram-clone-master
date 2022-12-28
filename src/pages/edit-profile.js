import {
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import Layout from '../components/shared/Layout';
import ProfilePicture from '../components/shared/ProfilePicture';
import { defaultCurrentUser } from '../data';
import { useEditProfilePageStyles } from '../styles';

function EditProfilePage({ history }) {
  const classes = useEditProfilePageStyles();
  const path = history.location.pathname;

  const [showDrawer, setDrawer] = React.useState(false);

  function handleToggleDrawer() {
    setDrawer((prev) => !prev);
  }

  function handleSelected(index) {
    switch (index) {
      case 0:
        return path.includes('edit');
      default:
        break;
    }
  }

  function handleListClick(index) {
    switch (index) {
      case 0:
        history.push('/accounts/edit');
        break;
      default:
        break;
    }
  }

  const options = [
    'Edit profile',
    'Change password',
    'Apps and websites',
    'Email notifications',
    'Push notifications',
    'Manage contacts',
    'Privacy and security',
    'Ads',
    'Supervision',
    'Login activity',
    'Emails from Instagram',
    'Help',
    'Digital collectibles',
  ];
  const drawer = (
    <List>
      {options.map((option, index) => (
        <ListItem
          key={option}
          button
          selected={handleSelected(index)}
          onClick={handleListClick}
          classes={{
            selected: classes.listItemSelected,
            button: classes.listItemButton,
          }}
        >
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <Layout title='Edit Profile'>
      <section className={classes.section}>
        <IconButton
          edge='start'
          onClick={handleToggleDrawer}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor='left'
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden
            xsDown
            implementation='css'
            className={classes.permanentDrawerRoot}
          >
            <Drawer
              variant='permanent'
              open
              classes={{
                paper: classes.permanentDrawerPaper,
                root: classes.permanentDrawerRoot,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main>
          {path.includes('edit') && <EditUserInfo user={defaultCurrentUser} />}
        </main>
      </section>
    </Layout>
  );
}

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles();
  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} user={user} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <Typography
            className={classes.typographyChangePic}
            color='primary'
            variant='body2'
          >
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form className={classes.form}>
        <SelectionItem text='Name' formItem={user.name} />
        <div className={classes.sectionItem}>
          <div />
          <Typography
            color='textSecondary'
            className={`${classes.justifySelfStart} ${classes.helperText}`}
          >
            You are using the same name on Instagram and Facebook. Go to
            Facebook to change your name.
          </Typography>
        </div>
        <SelectionItem text='Username' formItem={user.username} />
        <div className={classes.sectionItem}>
          <div />
          <Typography
            color='textSecondary'
            className={`${classes.justifySelfStart} ${classes.helperText}`}
          >
            In most cases, you'll be able to change your username back to
            dandy_jadie for another 14 days.
          </Typography>
        </div>
        <SelectionItem text='Website' formItem={user.website} />
        <div className={classes.sectionItem}>
          <div />
          <Typography
            color='textSecondary'
            className={`${classes.justifySelfStart} ${classes.helperText}`}
          >
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </Typography>
        </div>
        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.bio}>Bio</Typography>
          </aside>
          <TextField
            variant='outlined'
            multiline
            maxRows={3}
            minRows={3}
            fullWidth
            value={user.bio}
          />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography
            color='textSecondary'
            className={`${classes.justifySelfStart} ${classes.helperText}`}
          >
            <span style={{ fontWeight: '600', fontSize: '14px' }}>
              Personal information
            </span>
            <br />
            Provide your personal information, even if the account is used for a
            business, a pet or something else. This won't be a part of your
            public profile.
          </Typography>
        </div>

        <SelectionItem text='Email' formItem={user.email} />
        <SelectionItem text='Phone number' formItem={user.phone_number} />
        <SelectionItem text='Gender' formItem={user.gender} />
        <div className={classes.sectionItem}>
          <div />
          <Button
            type='submit'
            variant='contained'
            className={classes.justifySelfStart}
            color='primary'
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}

function SelectionItem({ type = 'text', text, formItem }) {
  const classes = useEditProfilePageStyles();
  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align='right'>
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>
      <TextField
        variant='outlined'
        fullWidth
        value={formItem}
        type={type}
        className={classes.textField}
        inputProps={{ className: classes.textFieldInput }}
      />
    </div>
  );
}

export default EditProfilePage;
