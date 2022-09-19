import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

import CommentsContext from "contexts/CommentsProvider";

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!content) return;
    setSending(true);
    const successful = await postComment(content);
    if (successful) setContent("");
    setSending(false);
  };

  if (!user) return <Typography>Login to post a comment</Typography>;

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "35vw",
        }}
      >
        <TextField
          name="replyContent"
          value={content}
          id="replyContent"
          type="text"
          onChange={handleInput}
          multiline
          placeholder={props.label ? props.label : "Write a new comment..."}
          rows={3}
          autoFocus
          margin="dense"
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        size="small"
        disabled={content.length < 1 || sending ? true : undefined}
      >
        {sending ? <CircularProgress size={24} /> : "Send"}
      </Button>
    </>
  );
};

export default CommentForm;
