import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import {
  Skeleton,
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

import ARTICLE_QUERY from "graphql/queries/query.article";

import RenderPost from "components/RenderPost";
import ScrollTop from "components/BackToTop";

import { ConfigContext } from "contexts/CommentsProvider";
import Comments from "containers/blog/CommentsContainer";

const ArticleContainer: React.FunctionComponent = () => {
  const { id } = useParams();
  const { setContentID } = useContext(ConfigContext);
  const { loading, error, data } = useQuery(ARTICLE_QUERY, {
    variables: { slug: id },
  });

  // Set the contentID for the comments (slug)
  useEffect(() => {
    if (id) setContentID(id);
  }, [id, setContentID]);

  if (error) return <Typography>`Error! ${error.message}`</Typography>;
  if (!data) return <p></p>; //! Sometimes "data" is loaded after the constants are loaded, simple fix (find a better solution)

  const posts = data?.posts.data;
  const post = posts[0];

  const imageUrl = post?.attributes.image.data.attributes.url;

  const datePublished = format(
    new Date(post?.attributes.publishedAt),
    "MMMM do, yyyy"
  );
  const dateEdited = format(
    new Date(post?.attributes.updatedAt),
    "MMMM do, yyyy"
  );

  return (
    <>
      <Helmet>
        <title>{post?.attributes.title} @ Code Rage</title>
        <meta name="description" content={post?.attributes.description} />
        <meta name="keywords" content={post?.attributes.keywords} />
        <meta name="author" content={post?.attributes.author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="og:title" content={post?.attributes.title} />
        <meta name="og:description" content={post?.attributes.description} />
        <meta name="og:image" content={imageUrl} />
        <meta name="og:url" content={window.location.href} />
        <meta name="og:site_name" content="Code Rage" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.attributes.title} />
        <meta
          name="twitter:description"
          content={post?.attributes.description}
        />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@Code_Rage_Blog" />
        <meta name="twitter:creator" content="@Code_Rage_Blog" />
      </Helmet>
      <Box>
        <Grid
          container
          direction="column"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Card
            sx={{
              //TODO: Set minWidth for Desktop
              maxWidth: (theme) => theme.breakpoints.values.lg,
              mb: 2,
              mx: 1,
            }}
          >
            {loading ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={250}
                height={45}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  mr: 2,
                }}
              >
                <CardHeader
                  titleTypographyProps={{ variant: "h5", gutterBottom: true }}
                  title={post.attributes.title}
                  subheader={datePublished ? datePublished : dateEdited}
                />
              </Box>
            )}
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={350}
              />
            ) : (
              <CardMedia
                component="img"
                height="350"
                src={imageUrl}
                alt={post.attributes.title}
              />
            )}
            <CardContent>
              <RenderPost markdown={post.attributes.content} />
              <Divider />
              {post.attributes.updatedAt != null ? (
                <Typography
                  align="left"
                  variant="caption"
                  sx={{
                    mt: 3,
                  }}
                >
                  {loading ? <Skeleton /> : `Edited on ${dateEdited}`}
                </Typography>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          mb: 2,
        }}
      >
        <Comments />
      </Box>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default ArticleContainer;
