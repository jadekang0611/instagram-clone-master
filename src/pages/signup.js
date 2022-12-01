import React from "react";
import {
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import SEO from "../components/shared/Seo";
import { useSignUpPageStyles } from "../styles";
import { Link } from "react-router-dom";

function SignUpPage() {
  const classes = useSignUpPageStyles();

  return (
    <>
      <SEO title="Sign up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography>
              Sign up to see photos and videos from your friends.
            </Typography>
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Mobile Number or Email"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
                autoComplete="fullname"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />

              <Button
                className={classes.button}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Sign up
              </Button>
            </form>

            {/* <LoginWithFacebook color="secondary" iconColor="blue" /> */}
            <Button fullWidth color="secondary">
              <Typography
                variant="caption"
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                Forgot password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" className={classes.smallText}>
              Have an account?
              <Link to="/accounts/emailsignup" className={classes.link}>
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
