import {
  AppBar,
  InputBase,
  Hidden,
  Avatar,
  Typography,
  Grid,
  Fade,
  Zoom,
} from '@material-ui/core';
import NotificationTooltip from '../notification/NotificationTooltip';
import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {
  LoadingIcon,
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon,
} from '../../icons';
import NotificationList from '../notification/NotificationList';
import AddPostDialog from '../post/AddPostDialog';

// UI and Query related
import { useNavbarStyles, WhiteTooltip, RedTooltip } from '../../styles';
import { useNProgress } from '@tanem/react-nprogress';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../../graphql/queries';
import { UserContext } from '../../App';
import { isAfter } from 'date-fns';

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setLoadingPage] = React.useState(true);
  const path = history.location.pathname;

  React.useEffect(() => {
    setLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}

function Logo() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to='/'>
        <div className={classes.logoWrapper}>
          <img
            height={105}
            src={logo}
            alt='instagram-logo'
            className={classes.logo}
          />
        </div>
      </Link>
    </div>
  );
}

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

  const hasResults = Boolean(query) && results.length > 0;

  React.useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    // useLazyQuery is synchronous doesn't return a promise
    const variables = { query: `%${query}%` };
    searchUsers({ variables });
    if (data) {
      setResults(data.instagram_users);
      setLoading(false);
    }
    // setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query, data, searchUsers]);

  function handleClearInput() {
    setQuery('');
  }

  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer}>
              {results.map((result) => (
                <Grid
                  key={result.id}
                  item
                  className={classes.resultLink}
                  container
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt='user avatar' />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant='body1'>{result.username}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
        <InputBase
          className={classes.input}
          onChange={(e) => setQuery(e.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span className={classes.clearIcon} onClick={handleClearInput} />
            )
          }
          placeholder='Search'
          value={query}
        />
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path }) {
  const { me, currentUserId } = React.useContext(UserContext);
  const newNotifications = me.notifications.filter(({ created_at }) =>
    isAfter(new Date(created_at), new Date(me.last_checked))
  );
  const hasNotifications = newNotifications.length > 0;

  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(hasNotifications);
  const [media, setMedia] = React.useState(null);
  const [showAddPostDialog, setAddPostDialog] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  function handleToggleList() {
    setShowList((prev) => !prev);
  }

  function handleHideTooltip() {
    setShowTooltip(false);
  }

  function handleHideList() {
    setShowList(false);
  }

  function openFileInput() {
    // to programmatically open the input field
    inputRef.current.click();
  }

  function handleAddPost(event) {
    /* I want to store this event in my state 
    because I want to pass this down to my 
    AddPostDialog component. */
    setMedia(event.target.files[0]);
    setAddPostDialog(true);
  }

  function handleClose() {
    setAddPostDialog(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && (
        <NotificationList
          notifications={me.notifications}
          handleHideList={handleHideList}
          currentUserId={currentUserId}
        />
      )}
      <div className={classes.linksWrapper}>
        {showAddPostDialog && (
          <AddPostDialog media={media} handleClose={handleClose} />
        )}
        <Hidden xsDown>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={handleAddPost}
          />
          <AddIcon onClick={openFileInput} />
        </Hidden>
        <Link to='/'>{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to='/explore'>
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip notifications={newNotifications} />}
        >
          <div
            className={hasNotifications ? classes.notifications : ''}
            onClick={handleToggleList}
          >
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${me.username}`}>
          <div
            className={path === `/${me.username}` ? classes.profileActive : ''}
          ></div>
          <Avatar src={me.profile_image} className={classes.profileImage} />
        </Link>
      </div>
    </div>
  );
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  );
}

export default Navbar;
