import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField("text");
  const password = useField("text");

  const clearForm = (params) => {
    params.forEach((elem) => elem.clear());
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = { username: username.value, password: password.value };
    console.log(user);
    clearForm([username, password]);
    let success = await dispatch(loginUser(user));

    if (success) {
      console.log("successful login");
      navigate("/home");
    } else {
      console.log("failed login");
    }
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          data-cy="login-username"
          name="username"
          value={username.value}
          type={username.type}
          onChange={username.onChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          data-cy="login-password"
          name="password"
          value={password.value}
          type={password.type}
          onChange={password.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
