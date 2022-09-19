import { Typography, Grid, Divider, Box } from "@mui/material";

const Rules = () => {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Rules for Commenting
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>- Comments are live, finally...</Typography>
        <Typography>- The Comments UI need love.</Typography>
        <Typography>- There's no rule for now, just be civilized!</Typography>
        <Typography>
          - I pushed this commit but there's a bunch of sloppy coding.
        </Typography>
        <Typography>
          - Anyway, the auth. is up again as well as a whole lot more.
        </Typography>
      </Box>
    </Grid>
  );
};

export default Rules;
