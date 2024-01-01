import { Typography, Divider, Box } from "@mui/material";

const Rules = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45vw" },
        pl: { xs: 2.5, md: 0 },
        mb: { xs: 4, md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rules for Commenting
      </Typography>
      <Divider variant="middle" />
      <Typography>
        <br />- Comments are live{" "}
        <span role="img" aria-label="festive">
          &#127881; &#127881; &#127881;
        </span>
        <br />
        - There's no rule for now, just be civilized!
        <br />
        - I pushed those commits but there's a bunch of sloppy coding.
        <br />- Still, the auth. is up again as well as a whole lot more, I can
        do the rest later.
        <br />- I'll be adding more features to the comment section soon.
      </Typography>
    </Box>
  );
};

export default Rules;
