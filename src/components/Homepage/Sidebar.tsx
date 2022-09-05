import { Grid, Paper, Typography, Box } from "@mui/material";

interface SidebarProps {
  title: string;
  description: string;
}

const Sidebar = (props: SidebarProps) => {
  const { title, description } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={3}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "@media screen and (max-width: 900px)": {
            alignItems: "center",
          },
        }}
      ></Box>
    </Grid>
  );
};

export default Sidebar;
