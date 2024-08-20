/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  Box,
  List,
  ListItem,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const [value, setValue] = useState("");

  return (
    <Box>
      <List
        aria-label="sidebar links"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
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
      {/* lajsdfljsdf */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: {
            md: "none",
          },
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="My Posts" icon={<GradeIcon />} />
          <BottomNavigationAction label="Saved" icon={<BookmarkIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Sidebar;
