import React from "react";
import { Redirect } from "react-router-dom";
import store, { addSlice, getSliceState } from "../store/store";
import { loggingIn, loginSuccessful, loginFailed } from "./LoginStore";

const Login = (props) => {
  React.useEffect(() => {
    console.log(props);
  }, [props]);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = async ({ username, password }) => {
    store.dispatch(loggingIn());
    let response;
    await new Promise((res) => {
      setTimeout(() => {
        if (username === "ankit") {
          response = "200";
        } else {
          response = "404";
        }
        res(response);
      }, 1000);
    });
    console.log(response);
    const { location } = props;
    const nextPath = location.state?.from ? location.state.from : "/";
    if (response === "200") {
      // dispatch queued actions here
      store.dispatch(loginSuccessful());
      console.log("login successful", props.history.push(nextPath));
    } else {
      store.dispatch(loginFailed());
      console.log("login failed");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const creds = {
      username,
      password,
    };
    loginUser(creds);
  }

  return (
    <>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          placeholder="enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={"password"}
          password="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type={"submit"} />
      </form>
    </>
  );
};

export default Login;
