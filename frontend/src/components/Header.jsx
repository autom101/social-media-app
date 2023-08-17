import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Link } from "react-router-dom";
import "./css/Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <div className="header">
      <h1>
        <Link to="/home" replace>
          Apppppppp
        </Link>
      </h1>
      <div className="person">
        <h2>{user.name}</h2>
        <PersonSharpIcon className="header-avatar" />
      </div>
    </div>
  );
};

export default Header;
