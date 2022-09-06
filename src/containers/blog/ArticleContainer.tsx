import { useParams } from "react-router";
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Fab,
  Divider,
} from "@mui/material";
import { format } from "date-fns";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { GetPostsQuery } from "components/ApolloQuery";
import ARTICLE_QUERY from "graphql/queries/query.article";

import Markdown from "components/Markdown";
import ScrollTop from "components/BackToTop";

const ArticleContainer = (props: any) => {
  const { id } = useParams();

  return (
    <>
      <GetPostsQuery query={ARTICLE_QUERY} slug={id}>
        {({ data }) => {
          const posts = data.posts.data;
          const post = posts[0];

          const imageUrl = post.attributes.image.data.attributes.url;

          const datePublished = format(
            new Date(post.attributes.publishedAt),
            "MMMM do, yyyy"
          );
          const dateEdited = format(
            new Date(post.attributes.updatedAt),
            "MMMM do, yyyy"
          );

          return (
            <Grid
              container
              spacing={0}
              direction="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Card
                sx={{
                  //TODO: Set minWidth for Desktop
                  maxWidth: 1200,
                  m: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    mr: 2,
                  }}
                >
                  <CardHeader
                    title={post.attributes.title}
                    subheader={datePublished}
                  />
                </Box>
                <CardMedia
                  component="img"
                  height="350"
                  src={imageUrl}
                  alt={post.attributes.title}
                />
                <CardContent>
                  <Markdown children={post.attributes.content} />
                  <Divider />
                  {post.attributes.updatedAt != null ? (
                    <Typography
                      align="left"
                      variant="caption"
                      sx={{
                        mt: 3,
                      }}
                    >
                      Edited on {dateEdited}
                    </Typography>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        }}
      </GetPostsQuery>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default ArticleContainer;
