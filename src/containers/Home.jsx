import { Grid, Container, Box, Typography } from "@mui/material";
import FEATURED_ARTICLES_QUERY from "../graphql/queries/query.isFeatured";
import MAIN_FEATURED_ARTICLES_QUERY from "../graphql/queries/query.isMainFeatured";
import Query from "../components/Query";

import MainFeaturedPost from "../components/Blog/MainFeaturedPost";
import FeaturedPost from "../components/Blog/FeaturedPost";
import Main from "../components/Homepage/Rules";
import Sidebar from "../components/Homepage/Sidebar";

const sidebar = {
  title: "About",
  description:
    "Website mainly made to showcase my work, I also wanted to put tutorials to help others on subjects that I was struggling on because of the lack of documentations or the contrary with too much versions and breaking changes.",
  archives: [{ title: "Coming soon...", url: "/" }],
};

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box component="main">
        <Query query={MAIN_FEATURED_ARTICLES_QUERY}>
          {({ data: isMainFeatured }) => {
            if (isMainFeatured.posts.data[0]) {
              return <MainFeaturedPost data={isMainFeatured.posts.data} />;
            }
            return (
              <Typography variant="string">
                Failed to load the main featured posts, you can rage quit...
              </Typography>
            );
          }}
        </Query>

        <Query query={FEATURED_ARTICLES_QUERY}>
          {({ data: isFeatured }) => {
            if (isFeatured.posts.data[0]) {
              return (
                <Grid container spacing={4}>
                  <FeaturedPost data={isFeatured.posts.data} />
                </Grid>
              );
            }
            return (
              <Typography variant="string">
                Failed to load the featured posts, you can rage quit...
              </Typography>
            );
          }}
        </Query>
        <Grid
          container
          spacing={4}
          sx={{
            mt: 3,
          }}
        >
          <Main />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
          />
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
