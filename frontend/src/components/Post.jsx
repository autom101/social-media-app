/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { updateLikedPost } from "../reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const [userLiked, setUserLiked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(post);
  }, [userLiked]);

  const handleLike = () => {
    dispatch(updateLikedPost(user, post.id));
  };

  return (
    <Card
      component="article"
      sx={{ backgroundColor: "background.post", borderRadius: "2rem" }}
      elevation={1}
    >
      <CardHeader
        avatar={
          <Avatar>
            {post.author.name ? post.author.name.slice(0, 2) : "NA"}
          </Avatar>
        }
        title={post.author.name ? post.author.name : "Unknown"}
        subheader={post && post.createdAt ? post.createdAt.toString() : ""}
      ></CardHeader>
      <CardContent>
        <Typography>{post.title}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like" onClick={handleLike}>
          <ThumbUpIcon></ThumbUpIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
