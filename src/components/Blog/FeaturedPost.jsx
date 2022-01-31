import { Link } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Box,
} from "@mui/material";
import Moment from "react-moment";

const FeaturedPost = ({ data: featuredPosts }) => {
  const seed = useUIDSeed();

  return (
    <>
      {featuredPosts.map((posts) => {
        const imageUrl =
          process.env.NODE_ENV !== "development"
            ? posts.attributes.image.data.attributes.url
            : process.env.REACT_APP_BACKEND_URL +
              posts.attributes.image.data.attributes.url;

        return (
          <Grid item xs={12} md={6} key={seed(posts)}>
            <CardActionArea
              component={Link}
              to={`post/${posts.attributes.slug}`}
            >
              <Card sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {posts.attributes.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {posts.attributes.synopsis} ...
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <Moment format="MMM Do YYYY">
                        {posts.attributes.publishedAt}
                      </Moment>
                    </Typography>
                  </CardContent>
                </Box>
                <Hidden xsDown>
                  <CardMedia
                    component="img"
                    title={posts.attributes.title}
                    sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                    image={imageUrl}
                    alt={posts.attributes.title}
                  />
                </Hidden>
              </Card>
            </CardActionArea>
          </Grid>
        );
      })}
    </>
  );
};

export default FeaturedPost;
