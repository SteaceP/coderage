// import Moment from "react-moment";
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
        {({ data: post }) => {
          const posts = post.posts.data;

          const imageUrl =
            process.env.REACT_APP_BACKEND_URL +
            posts[0].attributes.image.data.attributes.url;

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
                    title={posts[0].attributes.title}
                    // subheader={
                    //   <Moment format="MMMM Do YYYY">
                    //     {posts[0].attributes.publishedAt}
                    //   </Moment>
                    // }
                  />
                </Box>
                <CardMedia
                  component="img"
                  height="350"
                  src={imageUrl}
                  alt={posts[0].attributes.title}
                />
                <CardContent>
                  <Markdown>{posts[0].attributes.content}</Markdown>
                  <Divider />
                  {posts[0].attributes.updatedAt != null ? (
                    <Typography
                      align="left"
                      variant="caption"
                      sx={{
                        mt: 3,
                      }}
                    >
                      Edited on{" "}
                      {
                        // <Moment format="MMMM Do YYYY @ hh:mm">
                        //   {posts[0].attributes.updatedAt}
                        // </Moment>
                      }{" "}
                      ET
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
