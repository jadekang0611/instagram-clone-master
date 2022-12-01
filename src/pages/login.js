import {
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import SEO from "../components/shared/Seo";
import { useLoginPageStyles } from "../styles";
import { Link } from "react-router-dom";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";

function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form>
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
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.orText}
                >
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithFacebook color="secondary" iconColor="blue" />
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
              Don't have an account?
              <Link to="/accounts/emailsignup" className={classes.link}>
                <span>Sign up</span>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithFacebook({ color, iconColor }) {
  const classes = useLoginPageStyles();
  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

  return (
    <Button fullWidth color={color} className={classes.fbButton}>
      <img
        src={facebookIcon}
        alt="facebook icon"
        className={classes.facebookIcon}
      />
      Log In with Facebook
    </Button>
  );
}

export default LoginPage;
