import { Box, Skeleton } from "@mui/material";

const ArticleSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 0.5,
      }}
    >
      <Skeleton variant="rectangular" width="60%" height="100vh" />
    </Box>
  );
};

export default ArticleSkeleton;
