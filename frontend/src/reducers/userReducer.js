import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const user = localStorage.getItem("user");

const initialState =
  user !== null
    ? { isLoggedIn: true, user: JSON.parse(user) }
    : { isLoggedIn: false, user: null };

/* Defines the reducer and action creaters for the user state. Is mainly used to check if user is already logged in, and to update the user value upon successful or unsuccessful logins. */
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      localStorage.setItem("user", JSON.stringify(userObj));
      return { ...state, user: userObj };
    },
    modifyIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
  },
});

export const { updateUser, modifyIsLoggedIn } = userReducer.actions;

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const userReturned = await loginService.login(user);
      dispatch(updateUser(userReturned));
      dispatch(modifyIsLoggedIn(true));
      return true;
    } catch (error) {
      dispatch(updateUser(""));
      dispatch(modifyIsLoggedIn(false));
      return false;
    }
  };
};

export default userReducer.reducer;
