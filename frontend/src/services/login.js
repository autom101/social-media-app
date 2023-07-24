import axios from "axios";
const url = "http://localhost:3003/api/login";

const login = (user) => {
  axios.post(user, url);
};

export default { login };
