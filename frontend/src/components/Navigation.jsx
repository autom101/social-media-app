import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Navigation;
