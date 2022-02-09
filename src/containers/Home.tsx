import { Grid, Container, Box, Typography } from "@mui/material";

import MainPost from "components/Blog/MainPost";
import FeaturedPost from "components/Blog/FeaturedPost";
import Main from "components/Homepage/Rules";
import Sidebar from "components/Homepage/Sidebar";

import { HomePageQuery } from "components/ApolloQuery";
import FEATURED_ARTICLES_QUERY from "graphql/queries/query.isFeatured";
import MAIN_FEATURED_ARTICLES_QUERY from "graphql/queries/query.isMainFeatured";

const sidebar = {
  title: "About",
  description:
    "At the beginning, I was strugling with ES5/ES6, backend/frontend, React class vs Functionnal Component, etc. I was really lost with all those documentations, guides and tutorials. There wasn't really a great way (none that I found at that time) to demystify all of that. The main goal of this Website/Blog is to help newcomers find what they need minus the headaches.",
};

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box component="main">
        <HomePageQuery query={MAIN_FEATURED_ARTICLES_QUERY}>
          {({ data: isMainFeatured }) => {
            if (isMainFeatured.posts.data[0]) {
              return <MainPost mainpost={isMainFeatured.posts.data} />;
            }
            return (
              <Typography variant="caption">
                Failed to load the posts, you can rage quit... or cry!
              </Typography>
            );
          }}
        </HomePageQuery>

        <HomePageQuery query={FEATURED_ARTICLES_QUERY}>
          {({ data: isFeatured }) => {
            return (
              <Grid container spacing={4}>
                <FeaturedPost data={isFeatured.posts.data} />
              </Grid>
            );
          }}
        </HomePageQuery>
        <Grid
          container
          spacing={4}
          sx={{
            my: 3,
          }}
        >
          <Main />
          <Sidebar title={sidebar.title} description={sidebar.description} />
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
