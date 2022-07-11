import React, { useContext } from "react";
import AuthContext from "../store/auth-context/auth-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = () => {
  const contextAuth = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={contextAuth.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
