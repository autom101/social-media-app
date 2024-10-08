// Css and icon imports:
import "./css/Login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
// React and programming imports:
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField("text");
  const password = useField("password");

  const clearForm = (params) => {
    params.forEach((elem) => elem.clear());
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = { username: username.value, password: password.value };
    clearForm([username, password]);
    let success = await dispatch(loginUser(user));

    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <div className="login-picture"> </div>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="login-form-row">
          <label htmlFor="username">
            <PersonIcon className="login-icon login-personIcon" />
          </label>
          <input
            id="username"
            data-cy="login-username"
            placeholder="Username"
            value={username.value}
            type={username.type}
            onChange={username.onChange}
          />
        </div>

        <div className="login-form-row">
          <label htmlFor="password">
            <LockIcon className="login-icon login-lockIcon" />
          </label>
          <input
            id="password"
            data-cy="login-password"
            placeholder="Password"
            value={password.value}
            type={password.type}
            onChange={password.onChange}
          />
        </div>

        <div className="login-form-row">
          <button className="login-form-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
