import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Toolbar, Button, Box, Divider } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import logoWhiteTheme from "assets/images/logoTextWhiteTheme.png";
import logoBlackTheme from "assets/images/logoTextBlackTheme.png";

import { useAuthState } from "contexts/AuthContext";
import { ColorModeContext } from "contexts/DarkModeContext";
import UserPicture from "components/Header/UserAvatar";

import Categories from "./Categories";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { user } = useAuthState();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <>
      <Toolbar
        id="back-to-top-anchor" // BackToTop component refer to it
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box component={NavLink} to="/">
          {theme.palette.mode === "light" ? (
            <img src={logoWhiteTheme} alt="logo" height={60} width={100} />
          ) : (
            <img src={logoBlackTheme} alt="logo" height={60} width={100} />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "@media screen and (max-width: 601px)": {
              display: "none",
            },
          }}
        >
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            size="large"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Box
            sx={{
              "@media screen and (max-width: 601px)": {
                display: "none",
              },
            }}
          >
            {!user ? (
              <Button
                component={NavLink}
                to="/auth/signup"
                variant="outlined"
                size="small"
                sx={{
                  ml: 2.5,
                }}
              >
                Sign up
              </Button>
            ) : (
              <UserPicture />
            )}
          </Box>
        </Box>
        <MobileMenu />
      </Toolbar>

      <Divider variant="middle" light={true} />
      <Categories />
      <Divider
        variant="middle"
        light={true}
        sx={{
          mb: 2,
        }}
      />
    </>
  );
};

export default Header;
