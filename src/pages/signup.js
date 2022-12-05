import React from 'react';
import { Button, Card, TextField, Typography } from '@material-ui/core';
import SEO from '../components/shared/Seo';
import { useSignUpPageStyles } from '../styles';
import { LoginWithFacebook } from './login';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const classes = useSignUpPageStyles();

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
            <form>
              <TextField
                fullWidth
                variant='filled'
                label='Email'
                type='email'
                margin='dense'
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant='filled'
                label='Full Name'
                margin='dense'
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant='filled'
                label='Username'
                margin='dense'
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant='filled'
                label='Password'
                type='password'
                margin='dense'
                className={classes.textField}
              />

              <Button
                className={classes.button}
                variant='contained'
                fullWidth
                color='primary'
                type='submit'
              >
                Sign up
              </Button>
            </form>

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

export default SignUpPage;
