import { Box, Typography, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AuthHeader = (props: { title: string }) => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: "secondary.main",
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
    </Box>
  );
};

export default AuthHeader;
