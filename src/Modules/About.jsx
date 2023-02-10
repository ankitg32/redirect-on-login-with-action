import React from "react";
import { getLoginState } from "./Login/LoginStore";

const About = (props) => {
  const [checked, setChecked] = React.useState("NO");

  const { history } = props;

  function handleClick(e) {
    const loginState = getLoginState();
    if (!loginState.isLoggedIn) {
      // redirect to login page
      history.push("/login", {
        from: props.location,
      });
    } else {
      setChecked(checked === "NO" ? "YES" : "NO");
    }
  }

  return (
    <div>
      <p>I am ankit</p>
      <button onClick={handleClick}>I am private</button>
      <p>{checked}</p>
    </div>
  );
};

export default About;
