import axios from "axios";
const url = "http://localhost:3003/api/posts";

const getPosts = async () => {
  const response = await axios.get(url);
  return response.data;
};

export default { getPosts };
