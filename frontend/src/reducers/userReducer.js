import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const user = localStorage.getItem("user");

const initialState =
  user !== null && JSON.parse(user) !== null
    ? { isLoggedIn: true, userInfo: JSON.parse(user) }
    : { isLoggedIn: false, userInfo: null };

/* Defines the reducer and action creaters for the user state. Is mainly used to check if user is already logged in, and to update the user value upon successful or unsuccessful logins. */
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      localStorage.setItem("user", JSON.stringify(userObj));
      return { ...state, userInfo: userObj };
    },
    modifyIsLoggedIn(state, action) {
      console.log("Change to: " + action.payload);
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
      return true;
    } catch (error) {
      dispatch(updateUser(null));
      dispatch(modifyIsLoggedIn(false));
      return false;
    }
  };
};

export default userReducer.reducer;
