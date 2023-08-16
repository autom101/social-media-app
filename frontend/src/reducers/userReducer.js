import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const user = localStorage.getItem("user");

const initialState =
  user !== null
    ? { isLoggedIn: true, user: JSON.parse(user) }
    : { isLoggedIn: false, user: null };

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      return { ...state, user: action.payload };
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
      console.log("Successfully logged in:");
      dispatch(updateUser(userReturned));
      dispatch(modifyIsLoggedIn(true));
    } catch (error) {
      console.log(error);
      dispatch(modifyIsLoggedIn(false));
    }
  };
};

export default userReducer.reducer;