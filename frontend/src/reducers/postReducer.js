import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post";

const initialState = {
  postsList: [],
  isLoading: true,
};

const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addInitialPosts(state, action) {
      state.postsList = action.payload;
    },
    addPost(state, action) {
      state.postsList.push(action.payload);
    },
  },
});

export const { addInitialPosts, addPost } = postReducer.actions;

export const getInitialPosts = (user) => {
  return async (dispatch) => {
    try {
      const posts = await postService.getPosts(user.userInfo);
      await dispatch(addInitialPosts(posts));
      return posts;
    } catch (err) {
      console.log(err);
    }
  };
};

export default postReducer.reducer;
