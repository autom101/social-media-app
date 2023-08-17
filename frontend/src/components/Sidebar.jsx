import "./css/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home">Home</Link>
      <Link to="/home/myposts">My Posts</Link>
      <Link to="/home/saved">Saved</Link>
      <Link to="/home/settings">Settings</Link>
    </div>
  );
};

export default Sidebar;
