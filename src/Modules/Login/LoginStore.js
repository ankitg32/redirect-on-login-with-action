import { addSlice, getSliceState } from "../store/store";

const LOGIN = "login";

// Action generator
export const loggingIn = () => ({
  type: "LOGGING_IN",
});
export const loginSuccessful = () => (dispatch, getState) => {
  userLoggedIn();
  dispatch({
    type: "LOGIN_SUCCESSFUL",
  });
};
export const loginFailed = () => ({
  type: "LOGIN_FAILED",
});

let userLoggedIn = async () => {};

// a promise that resolves when the user is logged in
export const loginSuccessfulPromise = new Promise((res) => {
  userLoggedIn = res;
});

const defaultLoginState = {
  isLoggedIn: false,
  isLoginFailed: false,
  logging: false,
};

const loginReducer = (state = defaultLoginState, action) => {
  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        logging: true,
      };
    case "LOGIN_SUCCESSFUL":
      return {
        ...state,
        isLoggedIn: true,
        isLoginFailed: false,
        logging: false,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLoggedIn: false,
        isLoginFailed: true,
        logging: false,
      };
    default:
      return state;
  }
};

// add store slice for login
addSlice(LOGIN, loginReducer);

export const getLoginState = () => getSliceState(LOGIN);
