import axios from "axios";
const url = "http://localhost:3003/api/login";

const login = async (user) => {
  const response = await axios.post(url, user, { withCredentials: true });

  return response.data;
};

const refreshToken = async () => {
  const response = await axios.post(
    `${url}/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default { login, refreshToken };
