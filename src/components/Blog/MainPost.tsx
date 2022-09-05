import { Link as RouterLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import { Typography, Paper, Grid, Box, Link } from "@mui/material";

const MainPost = (props: { mainpost: any[] }) => {
  const seed = useUIDSeed();
  const theme = useTheme();

  return (
    <>
      {props.mainpost.map(
        (posts: {
          attributes: {
            image: {
              data: { attributes: { url: string; alternativeText: string } };
            };
            title: string;
            synopsis: string;
            slug: string;
          };
        }) => {
          const data = posts.attributes;

          return (
            <Paper
              key={seed(posts)}
              sx={{
                my: 3,
                backgroundColor: "inherit",
                position: "relative",
                color: " ",
                backgroundImage: `url(${data.image.data.attributes.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {/* Increase the priority of the hero background image */}
              <img
                style={{ display: "none" }}
                src={data.image.data.attributes.url}
                alt={data.image.data.attributes.alternativeText}
              />

              {/* overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.2)",
                }}
              />
              <Grid container>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      p: 3,
                      "@media screen and (min-width:900px)": {
                        p: 6,
                        pr: 0,
                      },
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                      sx={{
                        color:
                          theme.palette.mode === "light" ? "white" : "white", // for now that is that...
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="inherit"
                      paragraph
                      sx={{
                        color:
                          theme.palette.mode === "light" ? "white" : "white", // for now that is that...
                      }}
                    >
                      {data.synopsis}
                      {"..."}
                    </Typography>
                    <Link
                      component={RouterLink}
                      variant="subtitle1"
                      underline="hover"
                      to={`/post/${data.slug}`}
                      sx={{
                        color: theme.palette.mode === "light" ? "blue" : "blue", // for now that is that...
                      }}
                    >
                      Read more...
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          );
        }
      )}
    </>
  );
};

export default MainPost;
