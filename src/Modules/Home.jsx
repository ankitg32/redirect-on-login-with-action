import React from "react";
import store, {
  addSlice,
  getSliceState,
  subscribeToSliceState,
} from "./store/store";
import { getLoginState, loginSuccessfulPromise } from "./Login/LoginStore";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const HOME = "home";

const TOGGLE_FAVOURITE = "home/TOGGLE_FAVOURITE";

/** this action creator will return a 'thunk' that can check for auth
 * redirect to login page if not auth, add a promise that resolves when the login is successful that dispatches the action
 * if auth, dispatch the action
 */

const setFavourite = (item, history, location) => (dispatch, getState) => {
  if (getLoginState().isLoggedIn) {
    console.log("hello");
    dispatch({
      type: TOGGLE_FAVOURITE,
    });
  } else {
    //   add a callback to execute on successful login, and then redirect to login page
    console.log("setting callback on userLoggedIn");
    loginSuccessfulPromise.then(() => {
      console.log("here");
      dispatch({
        type: TOGGLE_FAVOURITE,
      });
    });
    history.push("/login", {
      from: location,
    });
  }
};

const initialState = {
  isFavouritePage: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return {
        ...state,
        isFavouritePage: !state.isFavouritePage,
      };
    default:
      return state;
  }
};

addSlice(HOME, homeReducer);

export const getHomeState = () => getSliceState(HOME);

const Home = (props) => {
  // props passed by the Route component. ref: https://v5.reactrouter.com/web/api/Route/route-render-methods
  const { history, location, checked } = props;

  const toggleFavourite = () => {
    console.log("check if the user is logged in", getLoginState());
    console.log(props);
    store.dispatch(setFavourite(null, history, location));
  };
  return (
    <>
      <h2>My Home</h2>
      <button onClick={toggleFavourite}>Private button</button>
      <div>{checked ? "YES" : "NO"}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  const isFavouritePage = getHomeState().isFavouritePage;
  return {
    checked: isFavouritePage,
  };
};

export default connect(mapStateToProps)(Home);
