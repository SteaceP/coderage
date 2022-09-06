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
        <Typography>- This functionality is being coded right now.</Typography>
      </Box>
    </Grid>
  );
};

export default Rules;
