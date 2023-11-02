import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../reducers/postReducer";

const MyPosts = () => {
  const dispatch = useDispatch();
  const userVal = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const updatePosts = async () => {
      await dispatch(getAllPosts(userVal));
      return posts;
    };

    updatePosts();
  }, [dispatch, userVal]);

  console.log(posts);

  return <div>MyPosts</div>;
};

export default MyPosts;
