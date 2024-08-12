/* eslint-disable react/prop-types */
import "./css/Sidebar.css";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const SidebarLink = ({ to, text, icon }) => {
  return (
    <ListItemButton component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const Sidebar = () => {
  return (
    <Box>
      <List aria-label="sidebar links">
        <ListItem disablePadding>
          <SidebarLink to="/home" text="Home" icon={<HomeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="/myposts" text="My Posts" icon={<GradeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="/saved" text="Saved" icon={<BookmarkIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="/settings" text="Settings" icon={<SettingsIcon />} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
