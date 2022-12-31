import {
  Button,
  Card,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import SEO from '../components/shared/Seo';
import { useLoginPageStyles } from '../styles';
import { Link, useHistory } from 'react-router-dom';
import FacebookIconBlue from '../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../images/facebook-icon-white.png';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../auth';
import isEmail from 'validator/lib/isEmail';
import { useApolloClient } from '@apollo/client';
import { GET_USER_EMAIL } from '../graphql/queries';
import { AuthError } from './signup';

function LoginPage() {
  const classes = useLoginPageStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, isTouched, ...formState },
  } = useForm({
    mode: 'onBlur',
  });

  const { loginWithEmailAndPassword } = React.useContext(AuthContext);
  const [showPassword, setPasswordVisibility] = React.useState(false);
  const [error, setError] = React.useState('');
  const hasPassword = Boolean(watch('password'));
  const history = useHistory();
  const client = useApolloClient();

  async function onSubmit({ input, password }) {
    try {
      setError('');
      if (!isEmail(input)) {
        // if the input provided is not email let's do look up
        input = await getUserEmail(input);
      }
      await loginWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    } catch (error) {
      console.log('Error logging in', error);
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  async function getUserEmail(input) {
    const variables = { input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables,
    });
    const userEmail = response.data.users[0]?.email || 'no@email.com';
    return userEmail;
  }

  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }

  return (
    <>
      <SEO title='Login' />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name='input'
                {...register('input', {
                  required: true,
                  minLength: 5,
                })}
                fullWidth
                variant='filled'
                label='Username, email, or phone'
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
                  endAdornment: hasPassword && (
                    <InputAdornment>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant='filled'
                label='Password'
                type={showPassword ? 'text' : 'password'}
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
                Log In
              </Button>
            </form>
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
            <LoginWithFacebook
              color='secondary'
              iconColor='blue'
              variant='contained'
            />
            <AuthError error={error} />
            <Button fullWidth color='secondary'>
              <Typography
                variant='caption'
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                Forgot password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align='right' className={classes.smallText}>
              Don't have an account?
              <Link to='/accounts/emailsignup' className={classes.link}>
                <span>Sign up</span>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const history = useHistory();
  const { logInWithGoogle } = React.useContext(AuthContext);
  const facebookIcon =
    iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

  const [error, setError] = React.useState('');
  async function handleLogInWithGoogle() {
    try {
      await logInWithGoogle();
      history.push('/');
    } catch (error) {
      console.log('Error logging in with Google', error);
      setError(error.message);
    }
  }

  return (
    <>
      <Button
        onClick={handleLogInWithGoogle}
        fullWidth
        color={color}
        className={classes.fbButton}
        variant={variant}
      >
        <img
          src={facebookIcon}
          alt='facebook icon'
          className={classes.facebookIcon}
        />
        Log In with Facebook
      </Button>
      <AuthError error={error} />
    </>
  );
}

export default LoginPage;
