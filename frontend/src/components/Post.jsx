/* eslint-disable react/prop-types */
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

const likePost = () => {
  console.log("Liked");
};

const Post = ({ post }) => {
  return (
    <Card
      component="article"
      sx={{ backgroundColor: "background.post" }}
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
        <IconButton aria-label="Like" onClick={likePost}>
          <ThumbUpIcon></ThumbUpIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
