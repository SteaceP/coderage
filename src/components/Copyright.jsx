import { Link, Typography, Box } from "@mui/material";

//TODO:

const Copyright = () => {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {"© Steacy Paquette "}
        {new Date().getFullYear()}
        <br></br>
        {"All stock images are courtesy of "}
        <Link
          color="inherit"
          underline="always"
          href={"https://unsplash.com/"}
          target="_blank"
          rel="noopener"
        >
          Unsplash
        </Link>
      </Typography>
    </Box>
  );
};

export default Copyright;
