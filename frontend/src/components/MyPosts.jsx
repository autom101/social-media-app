import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../reducers/postReducer";

const MyPosts = () => {
  const dispatch = useDispatch();
  const userVal = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts(userVal.userInfo));
    console.log(posts);
  }); // [dispatch, posts, userVal.userInfo]

  return <div>{posts ? posts[0] : "No posts to show at this time"}</div>;
};

export default MyPosts;
