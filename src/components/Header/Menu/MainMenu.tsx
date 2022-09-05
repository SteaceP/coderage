import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useAuthDispatch, useAuthState } from "contexts/AuthContext";
import { menuProps } from "components/Header/Menu/mobileMenuProps";
import UserPicture from "components/Header/Menu/UserAvatar";


const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = !!anchorEl;
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleMenu = (e: { currentTarget: any }) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = (route: To) => {
    navigate(route);
    setAnchorEl(null);
  };

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Box
        sx={{
          "@media screen and (min-width: 600px)": {
            display: "none",
          },
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open menu"
          onClick={handleMenu}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        PaperProps={menuProps}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user ? (
          <Box component="div">
            <MenuItem onClick={() => handleMenuClick("/auth/dashboard")}>
              <UserPicture />
              Profile
            </MenuItem>

            <Divider />

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              My blog posts
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
        ) : (
          <Box component="div">
            <MenuItem onClick={() => handleMenuClick("/auth/login")}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>

            <MenuItem onClick={() => handleMenuClick("/auth/signup")}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Signup
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default MainMenu;
