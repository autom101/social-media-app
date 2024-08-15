/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const likePost = () => {
  console.log("Liked");
};

const NewPost = ({ post }) => {
  return (
    <Card component="article" sx={{ backgroundColor: "background.post" }}>
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
        <Link sx={{ ml: "auto" }} className="Link">
          Show comments
        </Link>
      </CardActions>
    </Card>
  );
};

export default NewPost;
