import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post";

const initialState = [];

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    replacePosts(state, action) {
      state = action.payload;
    },
    addPost(state, action) {
      state = [...state, action.payload];
    },
  },
});

export const { replacePosts, addPost } = userReducer.actions;

export const getAllPosts = (user) => {
  return async (dispatch) => {
    try {
      const posts = await postService.getPosts(user);
      dispatch(replacePosts(posts));
    } catch (err) {
      console.log(err);
    }
  };
};

export default userReducer.reducer;
