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
// import Moment from "react-moment";

const FeaturedPost = ({ data: featuredPostsArray }) => {
  const uid = useUIDSeed();

  return (
    <>
      {featuredPostsArray.map((post: any) => {
        const imageUrl =
          process.env.REACT_APP_BACKEND_URL +
          post.attributes.image.data.attributes.url;

        return (
          <Grid item xs={12} md={6} key={uid(post)}>
            <CardActionArea
              component={Link}
              to={`post/${post.attributes.slug}`}
            >
              <Card sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {post.attributes.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.attributes.synopsis} ...
                    </Typography>
                  </CardContent>
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
