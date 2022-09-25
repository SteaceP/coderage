import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Link,
} from "@mui/material";

import CommentsContext from "contexts/CommentsProvider";

export type CommentFormProps = {
  label?: string;
};

const CommentForm: React.FC<CommentFormProps> = props => {
  const { user, postComment } = useContext(CommentsContext);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const navigate = useNavigate();

  const handleInput = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!content) return;
    setSending(true);
    const successful = await postComment(content);
    if (successful) setContent("");
    setSending(false);
  };

  const handleToggleForm = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggleForm(!toggleForm);
  };

  if (!user)
    return (
      <Typography
        component={Link}
        onClick={() => navigate("/auth/login")}
        sx={{
          mt: theme => theme.spacing(1.5),
        }}
      >
        Login to post a comment
      </Typography>
    );

  return (
    <>
      {!toggleForm ? (
        <Box
          component={Link}
          sx={{
            "mt": theme => theme.spacing(1.5),
            "textDecoration": "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          <Button onClick={handleToggleForm}>Post a comment</Button>
        </Box>
      ) : (
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: { xs: "90vw", md: "50vw", lg: "40vw" },
          }}
        >
          <TextField
            name="replyContent"
            value={content}
            id="replyContent"
            type="text"
            onChange={handleInput}
            multiline
            placeholder={
              props.label ? props.label : "Write your comment here..."
            }
            rows={3}
            margin="dense"
          />
          <Box
            sx={{
              "display": "flex",
              "justifyContent": "flex-end",
              "mt": theme => theme.spacing(0.5),
              "& > *:not(:last-child)": {
                mr: theme => theme.spacing(1),
              },
            }}
          >
            <Button variant="contained" onClick={handleToggleForm} size="small">
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              size="small"
              disabled={content.length < 3 || sending ? true : undefined}
            >
              {sending ? <CircularProgress size={24} /> : "Send"}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CommentForm;
