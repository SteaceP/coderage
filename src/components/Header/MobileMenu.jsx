import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
import { UserPicture } from "./UserPicture";

import Logout from "@mui/icons-material/Logout";

import { menuProps } from "./mobileMenuProps";

//TODO: replace the divs with something else(rethink the logic) fragments gives a mui error

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = !!anchorEl;
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClick = (route) => {
    navigate(route);
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          "@media screen and (min-width: 601px)": {
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
        {currentUser ? (
          <div>
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

            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </Menu>
    </>
  );
};

export default MobileMenu;
