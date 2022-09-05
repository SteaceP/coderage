import { Link } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

const FeaturedPost = ({ data: featuredPosts }) => {
  const uid = useUIDSeed();

  return (
    <>
      {featuredPosts.map((post) => {
        const data = post.attributes;

        return (
          <Grid item xs={12} md={6} key={uid(post)}>
            <CardActionArea
              component={Link}
              to={`post/${data.slug}`}
            >
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h2" variant="h5">
                      {data.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {data.synopsis} ...
                    </Typography>
                  </CardContent>
                    </Box>
                  <Box>
                  <CardMedia
                        component="img"
                        title={data.title}
                        sx={{ width: 160, height: "100%", display: { xs: "none", sm: "block" } }}
                        image={data.image.data.attributes.url}
                        alt={data.title}
                      />
                  </Box>
              </Card>
            </CardActionArea>
          </Grid>
        );
      })}
    </>
  );
};

export default FeaturedPost;
