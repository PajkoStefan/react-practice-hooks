import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

import AuthContext from "../store/auth-context/auth-context";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT": {
      return {
        value: action.payload,
        isValid: action.payload.toString().includes("@"),
      };
    }
    case "INPUT_VALIDATE_EMAIL": {
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    }
    default:
      return {
        value: "",
        isValid: true,
      };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "PASSWORD_INPUT": {
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    }
    case "INPUT_PASSWORD_VALIDATE": {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    }
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const initialEmailState = {
  value: "",
  isValid: null,
};

const initialPasswordState = {
  value: "",
  isValid: null,
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const contextAuth = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", payload: event.target.value });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_VALIDATE_EMAIL",
      payload: emailState.isValid,
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_PASSWORD_VALIDATE" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    contextAuth.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
