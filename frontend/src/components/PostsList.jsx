import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialPosts } from "../reducers/postReducer";

import { Stack } from "@mui/material";

import Post from "./Post";
import NewPost from "./NewPost";

const PostsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const postsState = useSelector((state) => state.posts);
  const posts = postsState.postsList;

  useEffect(() => {
    //get posts from the backend
    const getPosts = () => {
      dispatch(getInitialPosts(user));
    };

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {/*Only display posts if it has been loaded*/}
      {Array.isArray(posts)
        ? posts.map((post) => {
            return <Post key={post.id} post={post}></Post>;
          })
        : "No posts to display"}
      {Array.isArray(posts)
        ? posts.map((post) => {
            return <NewPost key={post.id} post={post}></NewPost>;
          })
        : "No posts to display"}
    </Stack>
  );
};

export default PostsList;
