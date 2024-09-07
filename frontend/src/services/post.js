import axios from "axios";
const url = "http://localhost:3003/api/posts";

const getPosts = async (userInfo) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  return response.data;
};

const createPost = async (userInfo, postInfo) => {
  const response = await axios.post(url, postInfo, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });

  return response.data;
};

export default { getPosts, createPost };
