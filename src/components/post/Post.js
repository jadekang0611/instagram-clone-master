import React from 'react';
import { usePostStyles } from '../../styles';
import UserCard from '../shared/UserCard';
import {
  CommentIcon,
  LikeIcon,
  MoreIcon,
  RemoveIcon,
  SaveIcon,
  ShareIcon,
  UnlikeIcon,
} from '../../icons';
import { Link } from 'react-router-dom';
import PostSkeleton from './PostSkeleton';
import {
  Avatar,
  Button,
  Divider,
  Hidden,
  TextField,
  Typography,
} from '@material-ui/core';
import OptionsDialog from '../shared/OptionsDialog';
import { useMutation, useSubscription } from '@apollo/client';
import { GET_POST } from '../../graphql/subscriptions';
import { UserContext } from '../../App';
import {
  CREATE_COMMENT,
  LIKE_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from '../../graphql/mutations';
import { formatDateToNowShort, formatPostDate } from '../../utils/formatDate';

function Post({ postId }) {
  const classes = usePostStyles();

  const [showOptionsDialog, setShowOptionsDialog] = React.useState(false);
  const variables = { postId };

  const { data, loading } = useSubscription(GET_POST, { variables });

  if (loading) return <PostSkeleton />;
  const {
    id,
    media,
    likes,
    likes_aggregate,
    user,
    caption,
    comments,
    created_at,
    saved_posts,
    location,
  } = data.posts_by_pk;

  const likesCount = likes_aggregate.aggregate.count;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} location={location} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div className={classes.postImage}>
          <img src={media} alt='Post media' className={classes.image} />
        </div>
        {/* Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton likes={likes} postId={id} authorId={user.id} />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton savedPosts={saved_posts} postId={postId} />
          </div>
          <Typography className={classes.likes} variant='subtitle2'>
            <span>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</span>
          </Typography>
          <div
            style={{
              overflowY: 'scroll',
              padding: '16px 12px',
              height: '100%',
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography color='textSecondary' className={classes.datePosted}>
            {formatPostDate(created_at)}
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment postId={id} />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
}

function AuthorCaption({ user, caption, createdAt }) {
  const classes = usePostStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={user.profile_image}
        alt='User avatar'
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={user.username}>
          <Typography
            variant='subtitle2'
            component='span'
            className={classes.username}
          >
            {user.username}
          </Typography>
          <Typography
            variant='body2'
            component='span'
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }}
          color='textSecondary'
          variant='caption'
        >
          {formatDateToNowShort(createdAt)}
        </Typography>
      </div>
    </div>
  );
}

function UserComment({ comment }) {
  const classes = usePostStyles();
  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={comment.user.profile_image}
        alt='User avatar'
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={comment.user.username}>
          <Typography
            variant='subtitle2'
            component='span'
            className={classes.username}
          >
            {comment.user.username}
          </Typography>
          <Typography
            variant='body2'
            component='span'
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
          >
            {comment.content}
          </Typography>
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }}
          color='textSecondary'
          variant='caption'
        >
          {formatDateToNowShort(comment.createdAt)}
        </Typography>
      </div>
    </div>
  );
}

function LikeButton({ likes, authorId, postId }) {
  const classes = usePostStyles();
  const { currentUserId } = React.useContext(UserContext);
  const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = React.useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
    profileId: authorId,
  };

  function handleLike() {
    setLiked(true);
    likePost({ variables });
  }

  function handleUnlike() {
    setLiked(false);
    unlikePost({ variables });
  }
  return <Icon className={className} onClick={onClick} />;
}

function SaveButton({ postId, savedPosts }) {
  const classes = usePostStyles();
  const { currentUserId } = React.useContext(UserContext);
  const isAlreadySaved = savedPosts.some(
    ({ user_id }) => user_id === currentUserId
  );
  const [saved, setSaved] = React.useState(isAlreadySaved);
  const [savePost] = useMutation(SAVE_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };
  const [unsavePost] = useMutation(UNSAVE_POST);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;

  function handleSave() {
    setSaved(true);
    savePost({ variables });
  }

  function handleRemove() {
    setSaved(false);
    unsavePost({ variables });
  }
  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment({ postId }) {
  const classes = usePostStyles();
  const { currentUserId } = React.useContext(UserContext);
  const [content, setContent] = React.useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  function handleAddComment() {
    const variables = {
      content,
      postId,
      userId: currentUserId,
    };
    createComment({ variables });
    setContent('');
  }
  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder='Add a commenet...'
        multiline
        maxRows={2}
        minRows={1}
        onChange={(event) => setContent(event.target.event)}
        className={classes.textField}
        InputProps={{
          classes: { root: classes.root, underline: classes.underline },
        }}
      />
      <Button
        color='primary'
        className={classes.commentButton}
        onClick={handleAddComment}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
