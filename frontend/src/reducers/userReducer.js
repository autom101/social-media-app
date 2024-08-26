import { createSlice } from "@reduxjs/toolkit";
import { store } from "../main";
import loginService from "../services/login";
import jwtHelper from "../utils/jwtHelper";

const user = jwtHelper.getUser();

const initialState = user
  ? { isLoggedIn: true, userInfo: user }
  : { isLoggedIn: false, userInfo: null };

/* Defines the reducer and action creators for the user state. Is mainly used to check if user is already logged in, and to update the user value upon successful or unsuccessful logins. */
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      jwtHelper.saveUser(userObj);
      return { ...state, userInfo: userObj };
    },
    modifyIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
  },
});

export const { updateUser, modifyIsLoggedIn } = userReducer.actions;

/* Attempt to login user. Update local state to a user object if successful, or null if not successful */
const saveUser = async (user) => {
  store.dispatch(updateUser(user));
  store.dispatch(modifyIsLoggedIn(true));
};

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const userReturned = await loginService.login(user);
      dispatch(updateUser(userReturned));
      dispatch(modifyIsLoggedIn(true));

      jwtHelper.saveUser(userReturned);

      return true;
    } catch (error) {
      dispatch(updateUser(null));
      dispatch(modifyIsLoggedIn(false));

      return false;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(updateUser(null));
      dispatch(modifyIsLoggedIn(false));

      jwtHelper.removeUser();
    } catch (err) {
      console.error(err);
    }
  };
};

export const isValidUser = async (user) => {
  const expiredToken = jwtHelper.isExpired(user);
  let newUser;

  if (expiredToken) {
    newUser = jwtHelper.getUser();
    await saveUser();
  }

  return newUser;
};

export default userReducer.reducer;
