import { useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { Link } from "react-router-dom";

import { LINKS as BottomBarLinks } from "../utils/links";

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
        {BottomBarLinks.map(({ name, to, Icon }, index) => (
          <BottomNavigationAction
            key={`bBar-${index}`}
            label={name}
            to={to}
            icon={<Icon />}
            component={Link}
          ></BottomNavigationAction>
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomBar;
