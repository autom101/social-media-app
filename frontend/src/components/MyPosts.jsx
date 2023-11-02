import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../reducers/postReducer";

const MyPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch();
  });
  return <div>MyPosts</div>;
};

export default MyPosts;
