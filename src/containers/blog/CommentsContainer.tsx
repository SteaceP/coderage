import { useContext, useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";

import Comment from "components/Comment/Comment";
import CommentsContext from "contexts/CommentsProvider";
import CommentForm from "components/Comment/CommentForm";

const Comments = () => {
  const { commentsCount, comments, loadMore, loadingComments } =
    useContext(CommentsContext);
  const [loadingMore, setLoadingMore] = useState(false);
  const [commentsJSX, setCommentsJSX] = useState<React.ReactNode[] | null>(
    null
  );
  useEffect(() => {
    setCommentsJSX(
      comments.map((comment) => {
        const subcommentsLength = comment.subcomments
          ? comment.subcomments.length
          : 0;
        return (
          <Comment
            subcommentsLength={subcommentsLength}
            data={comment}
            key={comment.id}
          />
        );
      })
    );
  }, [comments]);

  const loadMoreComments = async () => {
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loadingComments ? (
          <Typography>Loading Comments...</Typography>
        ) : comments.length > 0 ? (
          <Box>
            {commentsJSX}
            {commentsJSX && commentsJSX.length < commentsCount && (
              <Button
                onClick={loadMoreComments}
                disabled={loadingMore ? true : undefined}
              >
                Load more comments
              </Button>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1">
              There are no comments yet.
            </Typography>
          </Box>
        )}
      </Box>
      <CommentForm />
    </>
  );
};

export default Comments;
