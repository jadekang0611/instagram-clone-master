import React from 'react';
import { useProfilePageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Hidden,
  Typography,
  Zoom,
} from '@material-ui/core';
import ProfilePicture from '../components/shared/ProfilePicture';
import { Link, useHistory, useParams } from 'react-router-dom';
import { GearIcon } from '../icons';
import FollowButton from '../components/shared/FollowButton';
import ProfileTabs from '../components/profile/ProfileTabs';
import { AuthContext } from '../auth';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql/queries';
import LoadingScreen from '../components/shared/LoadingScreen';
import { UserContext } from '../App';
import { FOLLOW_USER, UNFOLLOW_USER } from '../graphql/mutations';

function ProfilePage() {
  const { username } = useParams();
  const { currentUserId } = React.useContext(UserContext);
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
  const variables = { username };
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    variables,
    fetchPolicy: 'no-cache',
  });

  if (loading) return <LoadingScreen />;
  const [user] = data.instagram_users;
  const isOwner = user.id === currentUserId;

  function handleOptionsMenuClick() {
    setShowOptionsMenu(true);
  }

  function handleCloseMenu() {
    setShowOptionsMenu(false);
  }

  return (
    <Layout title={`${user.name} (@${user.username})`}>
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} image={user.profile_image} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                user={user}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={user} />
              <NameBioSection user={user} />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture
                  size={77}
                  isOwner={isOwner}
                  image={user.profile_image}
                />
                <ProfileNameSection
                  user={user}
                  isOwner={isOwner}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                />
              </section>
              <NameBioSection user={user} />
            </CardContent>
            <PostCountSection user={user} />
          </Card>
        </Hidden>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        <ProfileTabs user={user} isOwner={isOwner} />
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
  const { currentUserId, followingIds, followerIds } =
    React.useContext(UserContext);
  let followButton;
  const isAlreadyFollowing = followingIds.some((id) => id === user.id);
  const [isFollowing, setFollowing] = React.useState(isAlreadyFollowing);
  const isFollower = !isFollowing && followerIds.some((id) => id === user.id);

  const variables = {
    userIdToFollow: user.id,
    currentUserId,
  };

  const [followUser] = useMutation(FOLLOW_USER);

  function handleFollowUser() {
    setFollowing(true);
    followUser({ variables });
  }

  const onUnfollowUser = React.useCallback(() => {
    setUnfollowDialog(false);
    setFollowing(false);
  }, []);

  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant='outlined'
        className={classes.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button
        onClick={handleFollowUser}
        variant='contained'
        color='primary'
        className={classes.button}
      >
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleFollowUser}
      >
        Follow
      </Button>
    );
  }
  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to={'/accounts/edit'} className={classes.link}>
                <Button variant='outlined'>Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon
                  className={classes.settings}
                  style={{ width: '22px', height: '22px' }}
                />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to={'/accounts/edit'} className={classes.link}>
              <Button variant='outlined' style={{ width: '100%' }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            <FollowButton />
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog
          onUnfollowUser={onUnfollowUser}
          user={user}
          onClose={() => setUnfollowDialog(false)}
        />
      )}
    </>
  );
}

function UnfollowDialog({ onClose, user, onUnfollowUser }) {
  const classes = useProfilePageStyles();
  const { currentUserId } = React.useContext(UserContext);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  function handleUnfollowUser() {
    const variables = {
      userIdToFollow: user.id,
      currentUserId,
    };
    unfollowUser({ variables });
    onUnfollowUser();
  }
  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align='center'
        variant='body2'
        className={classes.unfollowDialogText}
      >
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button onClick={handleUnfollowUser} className={classes.unfollowButton}>
        Unfollow
      </Button>
      <Divider />
      <Button className={classes.cancelButton} onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ['posts', 'followers', 'following'];
  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map((option) => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[`${option}_aggregate`].aggregate.count}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color='textSecondary'>{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}
function NameBioSection({ user }) {
  const classes = useProfilePageStyles();
  return (
    <>
      <section className={classes.section}>
        <Typography className={classes.typography}>{user.name}</Typography>
        <Typography>{user.bio}</Typography>
        <a
          href={user.website}
          target='_blank'
          rel='noopener noreferrer'
          className={classes.link}
        >
          <Typography className={classes.typography} color='secondary'>
            {user.website}
          </Typography>
        </a>
      </section>
    </>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const { signOut } = React.useContext(AuthContext);

  const [showLogOutMessage, setLogOutMessage] = React.useState(false);

  const client = useApolloClient();

  const history = useHistory();
  function handleLogOutClick() {
    setLogOutMessage(true);
    setTimeout(async () => {
      await client.clearStore();
      signOut();
      history.push('/accounts/login');
    }, 2000);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Loggin Out
          <Typography color='textSecondary'>
            You need to log back in.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text='Change Password' />
          <OptionsItem text='QR Code' />
          <OptionsItem text='Nametag' />
          <OptionsItem text='Apps and Websites' />
          <OptionsItem text='Notifications' />
          <OptionsItem text='Privacy and security' />
          <OptionsItem text='Supervision' />
          <OptionsItem text='Login activity' />
          <OptionsItem text='Email from Instagram' />
          <OptionsItem text='Report a problem' />
          <OptionsItem text='Embed' />
          <OptionsItem text='Log Out' onClick={handleLogOutClick} />
          <OptionsItem text='Cancel' onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: '12px 8px' }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

export default ProfilePage;
