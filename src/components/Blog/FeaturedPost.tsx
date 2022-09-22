import { Link } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const FeaturedPost = ({ data: featuredPosts }) => {
  const uid = useUIDSeed();

  return (
    <>
      {featuredPosts.map((post: any) => {
        const data = post?.attributes;

        return (
          <Grid item xs={12} md={6} key={uid(post)}>
            <CardActionArea component={Link} to={`post/${data.slug}`}>
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
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
                    sx={{
                      width: 160,
                      height: "100%",
                      display: { xs: "none", sm: "block" },
                    }}
                    image={data.image.data.attributes?.formats.small.url}
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
