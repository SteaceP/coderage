import { useParams } from "react-router";
import { useUIDSeed } from "react-uid";
import { Grid, Typography, Box } from "@mui/material";

import CATEGORY_ARTICLES_QUERY from "graphql/queries/query.articlesByCategories";
import Card from "components/Card";
import { GetPostsQuery } from "components/ApolloQuery";

const Category = () => {
  const { id } = useParams();
  const seed = useUIDSeed();

  return (
    <GetPostsQuery query={CATEGORY_ARTICLES_QUERY} slug={id}>
      {({ data: category }) => {
        const categories = category?.categories?.data;
        const postsArrayByCategory = categories[0].attributes.posts.data;

        if (postsArrayByCategory.length) {
          return (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                Articles About {categories[0].attributes.Name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  minWidth: 300,
                  mb: (theme) => theme.spacing(5),
                  px: (theme) => theme.spacing(10),
                }}
              >
                {postsArrayByCategory.map((postByCategory) => (
                  <Box
                    key={seed(postByCategory)}
                    sx={{
                      mb: (theme) => theme.spacing(4),
                    }}
                  >
                    <Card data={postByCategory} />
                  </Box>
                ))}
              </Box>
            </>
          );
        } else {
          return (
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              There's no articles about {categories[0].attributes.Name} yet.
              Come back soon.
            </Typography>
          );
        }
      }}
    </GetPostsQuery>
  );
};

export default Category;
