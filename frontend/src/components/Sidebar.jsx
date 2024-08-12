import "./css/Sidebar.css";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";

const Sidebar = () => {
  return (
    <Box>
      <Tabs orientation="vertical">
        <Tab>
          <Link to="/home">Home</Link>
        </Tab>
        <Tab>
          <Link to="/home/myposts">My Posts</Link>
        </Tab>
        <Tab>
          <Link to="/home/saved">Saved</Link>
        </Tab>
        <Tab>
          <Link to="/home/settings">Settings</Link>
        </Tab>
      </Tabs>
    </Box>
  );
};

export default Sidebar;
