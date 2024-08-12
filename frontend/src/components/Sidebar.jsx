/* eslint-disable react/prop-types */
import { Box, List, ListItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <Box>
      <List aria-label="sidebar links">
        <ListItem disablePadding>
          <SidebarLink to="" text="Home" icon={<HomeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="myposts" text="My Posts" icon={<GradeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="saved" text="Saved" icon={<BookmarkIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <SidebarLink to="settings" text="Settings" icon={<SettingsIcon />} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
