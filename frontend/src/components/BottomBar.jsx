import { useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from "react-router-dom";

const BottomBar = () => {
  const [value, setValue] = useState("");

  return (
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
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="My Posts"
          icon={<GradeIcon />}
          component={Link}
          to="myposts"
        />
        <BottomNavigationAction
          label="Saved"
          icon={<BookmarkIcon />}
          component={Link}
          to="saved"
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          component={Link}
          to="settings"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomBar;
