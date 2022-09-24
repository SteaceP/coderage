import { Container, Skeleton, Grid, Box } from "@mui/material";

const HomeLoading = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" width="100%" height={225} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomeLoading;
