import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Home from "./Modules/Home";
import Login from "./Modules/Login/Login";
import About from "./Modules/About";
import { Provider } from "react-redux";
import store from "./Modules/store/store";

// react-router uses this history package as one of the two dependencies (other being React itself)
// can refer this to understand more on this history package (wrapper around browser's history API)
// https://github.com/remix-run/history

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <h1>My App</h1>
          <NavLink
            to={(location) => ({
              ...location,
              pathname: "/",
              state: { from: location.pathname },
            })}
          >
            Home
          </NavLink>
          <NavLink
            to={(location) => ({
              ...location,
              pathname: "/login",
              state: { from: location.pathname },
            })}
          >
            Login
          </NavLink>
          <NavLink
            to={(location) => ({
              ...location,
              pathname: "/about",
              state: { from: location.pathname },
            })}
          >
            About
          </NavLink>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
