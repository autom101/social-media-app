import Post from "./Post";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialPosts } from "../reducers/postReducer";

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
    <div>
      {/*Only display posts if it is an array, and it is defined*/}
      {Array.isArray(posts)
        ? posts.map((post) => {
            return <Post key={post.id} post={post}></Post>;
          })
        : "No posts to display"}
    </div>
  );
};

export default PostsList;
