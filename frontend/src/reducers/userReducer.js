import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { getUser, removeUser, saveUser } from "../utils/jwtHelper";

const user = getUser();

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
      saveUser(userObj);
      return { ...state, userInfo: userObj };
    },
    modifyIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
  },
});

export const { updateUser, modifyIsLoggedIn } = userReducer.actions;

/* Attempt to login user. Update local state to a user object if successful, or null if not successful */
export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const userReturned = await loginService.login(user);
      dispatch(updateUser(userReturned));
      dispatch(modifyIsLoggedIn(true));

      saveUser(userReturned);

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

      removeUser();
    } catch (err) {
      console.error(err);
    }
  };
};

export default userReducer.reducer;
