import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormLabel,
  CircularProgress,
} from "@mui/material";

import CommentsContext from "./CommentsProvider";

export type CommentFormProps = {
  label?: string;
};

const CommentForm = (props: CommentFormProps) => {
  const { user, postComment } = useContext(CommentsContext);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleInput = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLTextAreaElement | HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!content) {
      return;
    }
    setSending(true);
    const successful = await postComment(content);
    if (successful) {
      setContent("");
    }
    setSending(false);
  };

  if (!user) {
    return <Typography>Login to post a comment</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          py: 3,
          px: 25,
        }}
      >
        <Typography variant="body1">
          {props.label || "Post a comment"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 1,
          }}
        >
          <FormLabel htmlFor="content" sx={{ mb: 1 }}>
            Your Comment
          </FormLabel>
          <TextField
            name="content"
            value={content}
            type="text"
            onChange={handleInput}
            multiline
            rows={3}
            fullWidth
            variant="filled"
            placeholder="Type your comment here"
          />

          <Box
            sx={{
              display: "inherit",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={content.length < 1 || sending ? true : undefined}
              sx={{ mt: 1 }}
            >
              {sending ? <CircularProgress size={24} /> : "Send"}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
