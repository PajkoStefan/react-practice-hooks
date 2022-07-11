import React, { useContext } from "react";

import classes from "./Navigation.module.css";

import AuthContext from "../../store/auth-context/auth-context";

const Navigation = () => {
  const contextAuth = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {contextAuth.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {contextAuth.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {contextAuth.isLoggedIn && (
          <li>
            <button onClick={contextAuth.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
