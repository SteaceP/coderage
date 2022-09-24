import { Paper, Typography, Box } from "@mui/material";

type SidebarProps = {
  title: string;
  description: string;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { title, description } = props;

  return (
    <Box>
      <Paper
        // elevation={3}
        variant="elevation"
        sx={{
          p: 2,
          maxWidth: { xs: "100%", sm: "100%", md: "30vw" },
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
    </Box>
  );
};

export default Sidebar;
