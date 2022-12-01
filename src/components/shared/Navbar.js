import { AppBar } from "@material-ui/core";
import React from "react";
import { useNavbarStyles } from "../../styles";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const classes = useNavbarStyles();

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
      </section>
    </AppBar>
  );
}

function Logo() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="instagram-logo" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
