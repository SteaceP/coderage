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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h2" variant="h5">
                      {post.attributes.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.attributes.synopsis} ...
                    </Typography>
                  </CardContent>
                    </Box>
                  <Box>
                  <CardMedia
                        component="img"
                        title={post.attributes.title}
                        sx={{ width: 160, height: "100%", display: { xs: "none", sm: "block" } }}
                        image={imageUrl}
                        alt={post.attributes.title}
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
