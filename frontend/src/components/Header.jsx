import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Link } from "react-router-dom";
import "./css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>
        <Link to="/home" replace>
          Apppppppp
        </Link>
      </h1>
      <PersonSharpIcon className="header-avatar" />
    </div>
  );
};

export default Header;
