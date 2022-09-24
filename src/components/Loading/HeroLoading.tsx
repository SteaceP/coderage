// load a hero image with the skeleton api of mui

import { useUIDSeed } from "react-uid";
import { Typography, Grid, Box, Container, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const data = {
  title: "title",
  description: "description",
  synopsis: "synopsis",
  slug: "slug",
  isMainFeatured: true,
  publishedAt: "publishedAt",
  id: "id",
  category: {
    data: {
      attributes: {
        Name: "Name",
      },
    },
  },
  image: {
    data: {
      attributes: {
        formats: {
          thumbnail: {
            url: "url",
          },
        },
      },
    },
  },
};

const HeroLoading = () => {
  const seed = useUIDSeed();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            position: "relative",
            p: 3,
            pr: { xs: 0, md: 3 },
            mt: { xs: 3, md: 3 },
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={300}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              borderRadius: 1,
            }}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default HeroLoading;

// Language: typescript'
// Path: src/components/Loading/PostLoading.tsx
