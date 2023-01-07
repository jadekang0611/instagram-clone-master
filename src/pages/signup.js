import React from 'react';
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import SEO from '../components/shared/Seo';
import { useSignUpPageStyles } from '../styles';
import { LoginWithFacebook } from './login';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import isEmail from 'validator/lib/isEmail';
import { CheckCircleOutline, HighlightOff } from '@material-ui/icons';
import { useApolloClient } from '@apollo/client';
import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries';

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const {
    getFieldState,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isTouched, ...formState },
  } = useForm({
    mode: 'onBlur',
  });
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);

  const history = useHistory();
  const [error, setError] = React.useState('');

  async function onSubmit(data) {
    // console.log({ data });
    try {
      setError('');
      await signUpWithEmailAndPassword(data);
      // to ensure user gets redirected properly once signed up
      setTimeout(() => history.push('/'), 0);
    } catch (error) {
      handleError(error);
    }
  }

  const client = useApolloClient();

  function handleError(error) {
    const errorMessage = String(error);
    if (errorMessage.includes('users_username_key')) {
      setError('Username already taken');
    } else if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  async function validateUserName(username) {
    const variables = { username };
    const response = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables,
    });
    console.log(response);
    const isUsernameValid = response.data.instagram_users.length === 0;
    return isUsernameValid;
  }

  const errorIcon = (
    <InputAdornment position='start'>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validIcon = (
    <InputAdornment position='start'>
      <CheckCircleOutline style={{ color: '#ccc', height: 30, width: 30 }} />
    </InputAdornment>
  );

  return (
    <>
      <SEO title='Sign up' />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook
              color='primary'
              iconColor='white'
              variant='contained'
            />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  className={classes.orText}
                >
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email', {
                  required: 'Email Address is required',
                  validate: (input) => isEmail(input),
                })}
                InputProps={{
                  endAdornment: errors.email
                    ? errorIcon
                    : getFieldState('email').isTouched && validIcon,
                }}
                fullWidth
                variant='filled'
                label='Email'
                type='email'
                margin='dense'
                className={classes.textField}
              />

              <TextField
                name='name'
                {...register('name', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                InputProps={{
                  endAdornment: errors.name
                    ? errorIcon
                    : getFieldState('name').isTouched && validIcon,
                }}
                fullWidth
                variant='filled'
                label='Full Name'
                margin='dense'
                className={classes.textField}
              />
              <TextField
                name='username'
                {...register('username', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  validate: async (input) => await validateUserName(input),
                  // accept only lower/uppcase letters, numbers
                  // periods and underscores
                  pattern: /^[a-zA-Z0-9_.]*$/,
                })}
                InputProps={{
                  endAdornment: errors.username
                    ? errorIcon
                    : getFieldState('username').isTouched && validIcon,
                }}
                fullWidth
                variant='filled'
                label='Username'
                margin='dense'
                className={classes.textField}
              />
              <TextField
                name='password'
                {...register('password', {
                  required: true,
                  minLength: 5,
                })}
                InputProps={{
                  endAdornment: errors.password
                    ? errorIcon
                    : getFieldState('password').isTouched && validIcon,
                }}
                fullWidth
                variant='filled'
                label='Password'
                type='password'
                margin='dense'
                className={classes.textField}
              />

              <Button
                disabled={!isValid || isSubmitting}
                className={classes.button}
                variant='contained'
                fullWidth
                color='primary'
                type='submit'
              >
                Sign up
              </Button>
            </form>
            <AuthError error={error} />
            <Button fullWidth color='secondary'></Button>
          </Card>
          <Card className={classes.loginCard}>
            <Typography align='right' className={classes.smallText}>
              Have an account?
              <Link to='/accounts/login' className={classes.link}>
                <span>Log in</span>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align='center'
        gutterBottom
        variant='body2'
        style={{ color: 'red' }}
      >
        {error}
      </Typography>
    )
  );
}

export default SignUpPage;
