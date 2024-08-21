/* eslint-disable react/prop-types */
import { Box, List, ListItem } from "@mui/material";

import SidebarLink from "./SidebarLink";

import { LINKS } from "../utils/links";

const Sidebar = () => {
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
        {LINKS.map(({ to, name, Icon }, index) => (
          <ListItem key={index} disablePadding>
            <SidebarLink to={to} text={name} icon={<Icon />} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
