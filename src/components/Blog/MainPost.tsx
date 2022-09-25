/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link as RouterLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { Typography, Paper, Grid, Box, Link, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MainPost = (props) => {
  const { mainpost } = props;
  const seed = useUIDSeed();
  const theme = useTheme();

  return (
    <Container>
      {mainpost.map(
        (posts: {
          attributes: {
            image: {
              data: {
                attributes: {
                  url: string;
                  alternativeText: string;
                  formats: {
                    medium: {
                      url: string;
                    };
                  };
                };
              };
            };
            title: string;
            synopsis: string;
            slug: string;
          };
        }) => {
          const data = posts.attributes;
          const image = data.image.data.attributes;

          return (
            <Paper
              key={seed(posts)}
              elevation={0}
              sx={{
                my: 3,
                backgroundColor: "inherit",
                position: "relative",
                color: "white",
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  background:
                    "linear-gradient(-40deg, rgba(0,0,0,.7) 45%, rgba(0,0,0,.2) 80%)",
                }}
              />
              <Grid container>
                <Grid
                  item
                  md={6}
                  sx={{
                    position: "relative",
                    p: { xs: 2, md: 5.5 },
                    m: { xs: 0, md: 2 },
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      textShadow: "3px 3px 5px rgba(0,0,0,.8)",
                    }}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="inherit"
                    paragraph
                    sx={{
                      fontWeight: 600,
                      textShadow: "3px 3px 5px rgba(0,0,0,.8)",
                    }}
                  >
                    {data.synopsis}
                  </Typography>
                  <Link
                    component={RouterLink}
                    variant="subtitle1"
                    underline="hover"
                    to={`/post/${data.slug}`}
                    color={theme.palette.primary.main}
                    sx={{
                      fontWeight: 700,
                      textShadow: "3px 3px 5px rgba(0,0,0,.8)",
                    }}
                  >
                    Read more...
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          );
        }
      )}
    </Container>
  );
};

export default MainPost;
