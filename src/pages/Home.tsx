import { Container, Box } from "@mui/material";
import { useQuery } from "@apollo/client";

import MainPost from "components/Blog/MainPost";
import FeaturedPost from "components/Blog/FeaturedPost";
import Rules from "components/Homepage/Rules";
import Sidebar from "components/Homepage/Sidebar";

import { FEATURED_ARTICLES_QUERY } from "graphql/queries/query.isFeatured";
import MAIN_FEATURED_ARTICLES_QUERY from "graphql/queries/query.isMainFeatured";

import HeroLoading from "components/Loading/HeroLoading";

const sidebar = {
  title: "About",
  description:
    "At the beginning, I was struggling with ES5/ES6, backend/frontend, React class vs Functional Component, etc. I was really lost with all those documentations, guides and tutorials. There wasn't really a great way (none that I found at that time) to demystify all of that. The main goal of this Website/Blog is to help newcomers find what they need minus the headaches.",
};

const Home: React.FC = () => {
  let content: any;

  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
  } = useQuery(MAIN_FEATURED_ARTICLES_QUERY);

  const {
    data: featuredData,
    loading: featuredLoading,
    error: featuredError,
  } = useQuery(FEATURED_ARTICLES_QUERY);

  if (heroLoading || featuredLoading) {
    content = <HeroLoading />;
  } else if (heroError || featuredError) {
    content = <p></p>;
  } else {
    content = (
      <Container>
        <MainPost mainpost={heroData.posts.data} />
        <FeaturedPost featuredPost={featuredData.posts.data} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-evenly" },
            alignItems: { xs: "center", md: "flex-start" },
            mb: 2,
          }}
        >
          <Rules />
          <Sidebar title={sidebar.title} description={sidebar.description} />
        </Box>
      </Container>
    );
  }
  return content;
};
export default Home;
