import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post";

const initialState = [];

const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    replacePosts(state, action) {
      state = action.payload;
      console.log(JSON.parse(JSON.stringify(state)));
    },
    addPost(state, action) {
      state.push(action.payload);
    },
  },
});

export const { replacePosts, addPost } = postReducer.actions;

export const getAllPosts = (user) => {
  return async (dispatch) => {
    try {
      const posts = await postService.getPosts(user);
      await dispatch(replacePosts(posts));
    } catch (err) {
      console.log(err);
    }
  };
};

export default postReducer.reducer;
