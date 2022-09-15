import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  List,
  Button,
  ListItem,
  ListItemText,
  FormLabel,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import CommentsContext from "./CommentsProvider";
import { ISOToFull } from "lib/date-formats";
import Reply from "./Reply";
import { IComment, ISubcomment } from "./CommentsProvider";

export type CommentProps = {
  data: IComment;
  subcommentsLength: Number;
};

const Comment = ({ data, subcommentsLength }: CommentProps) => {
  const { collapseReplies, user } = useContext(CommentsContext);
  const [showFormReply, setShowFormReply] = useState(false);
  const [showReplies, setShowReplies] = useState(collapseReplies !== true);

  const renderReplies = () => {
    if (data.subcomments && data.subcomments.length) {
      const repliesJSX = data.subcomments.map((replyData) => {
        return <Reply data={replyData} key={replyData.id} />;
      });
      return repliesJSX;
    }
    return null;
  };

  //! TO use between name and date •

  const [replies, setReplies] = useState(renderReplies());

  useEffect(() => {
    setReplies(renderReplies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcommentsLength]);
  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };
  const toggleShowFormReply = () => {
    setShowFormReply((prev) => !prev);
  };
  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ListItemText
            primary={
              <Typography variant="subtitle2">
                {data.from_admin
                  ? "Admin"
                  : data.author
                  ? data.author.username
                  : "User"}
              </Typography>
            }
            secondary={
              <Typography variant="caption">
                {ISOToFull(data.createdAt)}
              </Typography>
            }
          />
          <Typography variant="caption"></Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {replies && replies.length ? (
              <Button
                variant="text"
                onClick={toggleReplies}
                sx={{ textTransform: "none" }}
              >
                1 {replies.length === 1 ? " reply" : " replies"}{" "}
                {/*//! Hardcoded */}
              </Button>
            ) : (
              <Button disabled>0 replies</Button>
            )}
            {user && (
              <Button
                variant="text"
                onClick={toggleShowFormReply}
                sx={{ textTransform: "none" }}
              >
                Leave a reply
              </Button>
            )}
          </Box>
        </Grid>
        {showFormReply && (
          <FormReply
            commentID={data.id}
            closeForm={() => setShowFormReply(false)}
          />
        )}
        {showReplies && <Box>{replies}</Box>}
      </Grid>
    </ListItem>
  );
};

export default Comment;

interface FormReplyProps {
  commentID: number;
  closeForm: () => void;
}

const FormReply = ({ commentID, closeForm }: FormReplyProps) => {
  const { postReply } = useContext(CommentsContext);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleInput = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContent(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      return;
    }
    setSending(true);
    const successful = await postReply(commentID, content);
    if (successful) {
      closeForm();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        // flexDirection: "column",
        my: 3,
        // px: 30,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel>Reply</FormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={content}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="text"
              onClick={closeForm}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={sending}
              sx={{ textTransform: "none" }}
            >
              {sending ? <CircularProgress size={20} /> : "Reply"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

{
  /* </form>
<Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 900,
    my: 3,
  }}
>
  <Textfield
    name="content"
    value={content}
    multiline
    rows={3}
    onChange={handleInput}
    placeholder="Leave a reply"
    cols={50}
  />
  <Button
    type="submit"
    variant="contained"
    disabled={content.length < 1 || sending ? true : undefined}
    sx={{ mt: 1 }}
  >
    {sending ? "Sending..." : "Send"}
  </Button>
  <Button
    type="button"
    disabled={sending ? true : undefined}
    onClick={closeForm}
  >
    Cancel
  </Button>
</Box> */
}
