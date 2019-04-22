import types from "./types";
import api from "../api";

export const userLoggedIn = user => ({
  type: types.USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: types.USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");
  dispatch(userLoggedOut());
};
