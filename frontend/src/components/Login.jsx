import { useState } from "react";
import loginService from "../services/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    console.log(user);
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <label>Username: </label>
        <input
          id="username"
          data-cy="login-username"
          value={username}
          name="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password: </label>
        <input
          id="password"
          data-cy="login-password"
          value={password}
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
