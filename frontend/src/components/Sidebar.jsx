import "./css/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home">Home </Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Sidebar;
