import { Link } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Masonry from "@mui/lab/Masonry";
import Divider from "@mui/material/Divider";

const FeaturedPost = (props) => {
  const { featuredPost } = props;
  const uid = useUIDSeed();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Masonry columns={{ xs: 1, md: 2 }} spacing={3} sx={{ mb: 2 }}>
        {featuredPost.map((posts) => {
          const post = posts.attributes;
          const image = post.image.data.attributes;
          const category = post.category.data.attributes.Name;
          return (
            <Card
              elevation={0}
              key={uid(posts)}
              sx={{
                borderEndEndRadius: 10,
                boxShadow: "-8px 12px 3px 1px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  boxShadow: "-3px 3px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardActionArea component={Link} to={`post/${post.slug}`}>
                <Box
                  sx={{
                    display: { xs: "inline", sm: "flex", md: "flex" },
                  }}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[300]
                          : theme.palette.grey[900],
                    }}
                  >
                    <Typography
                      variant="inherit"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        color: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[500]
                            : theme.palette.grey.A700,
                      }}
                    >
                      {category}
                    </Typography>
                    <Typography
                      component="h2"
                      variant="overline"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {post.title}
                    </Typography>
                    <Divider
                      light={true}
                      variant={"middle"}
                      sx={{
                        mb: 0.5,
                        mt: -1.5,
                        maxWidth: "25vw",
                      }}
                    />
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.primary.contrastText[300],
                      }}
                    >
                      {post.synopsis}
                      {"..."}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="picture"
                    sx={{
                      display: { xs: "none", sm: "flex", md: "flex" },
                      maxWidth: 160,
                      maxHeight: "140",
                    }}
                  >
                    <source
                      media="(min-width: 600px)"
                      srcSet={image.formats.thumbnail.url}
                      type="image/jpeg"
                    />
                    <source
                      media="(min-width: 900px)"
                      srcSet={image.formats.small.url}
                      type="image/jpeg"
                    />

                    <img
                      src={image.url}
                      alt={image.alternativeText}
                      loading="lazy"
                      width="100%"
                      height="100%"
                    />
                  </CardMedia>
                </Box>
              </CardActionArea>
            </Card>
          );
        })}
      </Masonry>
    </Container>
  );
};

export default FeaturedPost;

// sx={{
//   display: { xs: "none", sm: "flex", md: "flex" },
//   maxWidth: 160,
//   maxHeight: "140",
// }}
// image={image.url}
// src-set={"max-width: 160px"}
// sizes="(max-width: 900px) 100px, 200px"
// alt={image.alternativeText}
// loading="lazy"
