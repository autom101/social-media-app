import { useParams } from "react-router-dom";

const Post = () => {
  return (
    <article className="post-container">
      <div className="post-info">
        <img className="post-avatar" src="" alt="" />
        <h3 className="post-username">Some random user</h3>
      </div>
      {/*This is going to contain extra options such as share, save, etc*/}
      <div className="post-extra"></div>
      {/*This is going to contain any images and text in the post and when it was created*/}
      <div className="post-content">
        <p>
          Whatever text is on the post that is eventually going to get cut off
          at some point.
        </p>
        <h4 className="post-time-created">Posted this at: 6 pm</h4>
      </div>
      {/*This is going to contain the like button and comments*/}
      <div className="post-options">
        <button className="post-like-btn">Like</button>
        <a className="post-comments-link" href="#">
          This will lead to comments
        </a>
      </div>
    </article>
  );
};

export default Post;
