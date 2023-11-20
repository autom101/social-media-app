import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialPosts } from "../reducers/postReducer";

const PostsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const postsState = useSelector((state) => state.posts);
  const posts = postsState.postsList;

  useEffect(() => {
    const getPosts = () => {
      dispatch(getInitialPosts(user));
    };

    getPosts();
  }, [dispatch, user, postsState]);

  return (
    <div>
      {Array.isArray(posts)
        ? posts.map((post) => {
            return <p key={post.id}>{post.title}</p>;
          })
        : "No posts to display"}
    </div>
  );
};

export default PostsList;
