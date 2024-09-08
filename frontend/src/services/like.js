import axios from "axios";
const url = "http://localhost:3003/api/posts";

const likePost = async (userInfo, postId) => {
  const likeUrl = `${url}/${postId}/like`;
  const response = await axios.post(
    likeUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  const data = await response.data;

  return data;
};

export default { likePost };
