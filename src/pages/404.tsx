import { useLocation, NavLink } from "react-router-dom";
import { Box, Button, Container, Typography, Grid } from "@mui/material";

const NoMatch = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            pt: ["20%", "20%"],
            width: "100%",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              pb: ["20%", "20%"],
              pl: ["20%", "10%"],
            }}
          >
            <Typography variant="h1">404</Typography>
            <Typography variant="h6" gutterBottom>
              The page <code>coderage.pro{location.pathname}</code> doesn't
              exist.
            </Typography>
            <Button component={NavLink} to="/" variant="contained">
              Back Home
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              pl: ["20%", "10%"],
            }}
          >
            <img
              src="https://res.cloudinary.com/coderage/image/upload/v1663170593/crazy_nuts_mad_a2181f0497.gif?updated_at=2022-09-14T15:49:51.022Z"
              alt=""
              width={200}
              height={200}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NoMatch;
