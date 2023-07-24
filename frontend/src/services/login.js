import axios from "axios";
const url = "http://localhost:3003/api/login";

const login = async (user) => {
  const response = await axios.post(url, user);
  return response.data;
};

export default { login };
