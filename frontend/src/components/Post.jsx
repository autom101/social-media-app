/* eslint-disable react/prop-types */
import "./css/Post.css";
import { Paper } from "@mui/material";

const Post = ({ post }) => {
  return (
    <Paper
      elevation={2}
      component="article"
      sx={{ backgroundColor: "background.post" }}
    >
      <article className="post-container flex">
        <div className="post-info flex">
          <img className="post-avatar" src="" alt="" />
          <h3>Some random user</h3>
        </div>
        {/*This is going to contain extra options such as share, save, etc*/}
        <div className="post-content flex">
          <p>{post.title}</p>
        </div>
        {/* */}
        <div className="post-extra flex">
          <h4 className="post-time-created flex">
            {new Date(post.createdAt).toLocaleTimeString("en-US")}
          </h4>
        </div>
        {/*This is going to contain the like button and comments*/}
        <div className="post-options flex">
          <button className="post-like-btn">Like</button>
          <a href="#">This will lead to comments</a>
        </div>
      </article>
    </Paper>
  );
};

export default Post;
