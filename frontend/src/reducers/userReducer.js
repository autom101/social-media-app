import { createSlice } from "@reduxjs/toolkit";

let initialState = "";

if (localStorage.getItem("user") !== null) {
  initialState = JSON.parse(localStorage.getItem("user")); // token from local storage or empty
}

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      return action.payload;
    },
  },
});

export const { updateUser } = userReducer.actions;

export default userReducer.reducer;
