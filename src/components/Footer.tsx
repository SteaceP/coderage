import { Container, Box, Link, Grid } from "@mui/material";
import { useUIDSeed } from "react-uid";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Copyright from "./Copyright";

const Footer = () => {
  const seed = useUIDSeed();

  const socialNetworks = [
    {
      name: "GitHub",
      icon: GitHubIcon,
      url: "https://github.com/SteaceP",
      ariaLabel: "Github Profile",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/optimumvape/",
      ariaLabel: "LinkedIn Profile",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: "https://twitter.com/PaquetteSteacy",
      ariaLabel: "Twitter Account",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://www.facebook.com/steacyp",
      ariaLabel: "Facebook Account",
    },
  ]; // No good reasons to have this on the backend. Don't touch or put in a separate file.

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {socialNetworks.map((network) => (
            <Link
              key={seed(network)}
              component="a"
              display="block"
              variant="body1"
              underline="hover"
              aria-label={network.ariaLabel}
              href={network.url}
              target="_blank"
              rel="noopener"
            >
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <network.icon />
                </Grid>
                <Grid
                  item
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  {network.name}
                </Grid>
              </Grid>
            </Link>
          ))}
        </Box>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
