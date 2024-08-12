/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const SidebarLink = ({ to, text, icon }) => {
  return (
    <ListItemButton component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default SidebarLink;
