import {
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { UserContext } from '../App';
import Layout from '../components/shared/Layout';
import ProfilePicture from '../components/shared/ProfilePicture';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EDIT_USER_PROFILE } from '../graphql/queries';
import { useEditProfilePageStyles } from '../styles';
import LoadingScreen from '../components/shared/LoadingScreen';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { EDIT_USER } from '../graphql/mutations';
import { AuthContext } from '../auth';

function EditProfilePage({ history }) {
  const { currentUserId } = React.useContext(UserContext);
  const variables = { id: currentUserId };
  const { data, loading } = useQuery(GET_EDIT_USER_PROFILE, { variables });
  const classes = useEditProfilePageStyles();
  const path = history.location.pathname;
  const [showDrawer, setDrawer] = React.useState(false);

  if (loading) return <LoadingScreen />;

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
          {path.includes('edit') && <EditUserInfo user={data.users_by_pk} />}
        </main>
      </section>
    </Layout>
  );
}

const DEFAULT_ERROR = { type: '', message: '' };

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const { updateEmail } = React.useContext(AuthContext);
  const [editUser] = useMutation(EDIT_USER);
  const [error, setError] = React.useState(DEFAULT_ERROR);
  const [open, setOpen] = React.useState(false);

  async function onSubmit(data) {
    try {
      setError(DEFAULT_ERROR);
      const variables = { ...data, id: user.id };
      await updateEmail(data.email);
      await editUser({ variables });
      setOpen(true);
    } catch (error) {
      console.error('Error updating profile', error);
      handleError(error);
    }
  }

  async function handleError(error) {
    if (error.message.includes('users_username_key')) {
      setError({
        type: 'username',
        message: 'This username is already taken.',
      });
    } else if (error.code.includes('auth')) {
      setError({ type: 'email', message: error.message });
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} image={user.profile_image} />
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
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <SelectionItem
          text='Name'
          formItem={user.name}
          name='name'
          register={register('name', {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />
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
        <SelectionItem
          text='Username'
          error={error}
          formItem={user.username}
          name='username'
          register={register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9_]*$/,
            minLength: 5,
            maxLength: 20,
          })}
        />
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
        <SelectionItem
          text='Website'
          formItem={user.website}
          name='website'
          register={register('website', {
            validate: (input) =>
              Boolean(input)
                ? isURL(input, {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                  })
                : true,
          })}
        />
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
            name='bio'
            register={register('bio', {
              required: false,
              maxLength: 120,
            })}
            variant='outlined'
            multiline
            maxRows={3}
            minRows={3}
            fullWidth
            defaultValue={user.bio}
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

        <SelectionItem
          text='Email'
          error={error}
          formItem={user.email}
          name='email'
          register={register('email', {
            required: true,
            validate: (input) => isEmail(input),
          })}
        />
        <SelectionItem
          text='Phone number'
          formItem={user.phone_number}
          name='phone_number'
          ref={register('phone_number', {
            required: false,
            validate: (input) => (Boolean(input) ? isMobilePhone(input) : true),
          })}
        />
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        message={<span>Profile updated</span>}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
function SelectionItem({
  type = 'text',
  text,
  formItem,
  register,
  error,
  name,
}) {
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
        name={name}
        {...register}
        helperText={error?.type === name && error.message}
        variant='outlined'
        fullWidth
        defaultValue={formItem}
        type={type}
        className={classes.textField}
        inputProps={{ className: classes.textFieldInput }}
      />
    </div>
  );
}

export default EditProfilePage;
