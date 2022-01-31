import { Link as RouterLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { Link, Grid, Paper, Typography, Box } from "@mui/material";

const Sidebar = ({ title, archives, description, portfolio }) => {
  const seed = useUIDSeed();

  return (
    <Grid item xs={12} md={4}>
      <Paper // Gives a darker background around the website description "About"
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[300]
              : theme.palette.grey[900],
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>

      <Box // Sections title and content
        sx={{
          display: "flex",
          flexDirection: "column",
          "@media screen and (max-width: 900px)": {
            alignItems: "center",
          },
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mt: 3,
          }}
        >
          Archives
        </Typography>
        {archives.map((archive) => (
          <Link
            component={RouterLink}
            underline="hover"
            display="block"
            variant="body1"
            to={archive.url}
            key={seed(archive)}
          >
            {archive.title}
          </Link>
        ))}
      </Box>
    </Grid>
  );
};

export default Sidebar;
