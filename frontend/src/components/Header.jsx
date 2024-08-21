import "./css/Header.css";

import { useState } from "react";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { useSelector } from "react-redux";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

const Header = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [logoutAnchor, setLogoutAnchor] = useState(null);

  const handleOpenLogoutMenu = (e) => {
    setLogoutAnchor(e.currentTarget);
  };

  const handleCloseLogoutMenu = () => {
    setLogoutAnchor(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h4" component="h1">
            Babble
          </Typography>
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6" component="p">
              {user.username}
            </Typography>
            <Tooltip title="Open Settings Menu">
              <IconButton onClick={handleOpenLogoutMenu} sx={{ p: 0 }}>
                <Avatar>
                  <PersonSharpIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="nav-menu"
              sx={{ mt: "2rem" }}
              anchorEl={logoutAnchor}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(logoutAnchor)}
              onClose={handleCloseLogoutMenu}
            >
              <MenuItem>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
