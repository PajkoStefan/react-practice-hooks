import React, { useContext } from "react";

import MainHeader from "../MainHeader/MainHeader";
import Login from "../Login/Login";
import Home from "../Home/Home";

import AuthContext from "../store/auth-context/auth-context";

function AppWrapper() {
  const contextAuth = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!contextAuth.isLoggedIn && <Login />}
        {contextAuth.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default AppWrapper;
