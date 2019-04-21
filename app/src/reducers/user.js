import types from "../actions/types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return action.user;
    default:
      return state;
  }
}
