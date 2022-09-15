import { Box, Skeleton } from "@mui/material";

export const ArticleSkeleton: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 0.5,
      }}
    >
      {/* <Skeleton /> */}
      <Skeleton variant="rectangular" width="60%" height="100vh" />
    </Box>
  );
};
