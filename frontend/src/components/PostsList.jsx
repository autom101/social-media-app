import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialPosts } from "../reducers/postReducer";

import { Stack } from "@mui/material";

import Post from "./Post";

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
    <Stack gap={3}>
      {/*Only display posts if they are loaded*/}
      {Array.isArray(posts)
        ? posts.map((post) => {
            return <Post key={post.id} post={post}></Post>;
          })
        : "No posts to display"}
    </Stack>
  );
};

export default PostsList;
