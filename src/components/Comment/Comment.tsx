import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  IconButton,
  Divider,
  Container,
} from "@mui/material";

import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import CommentsContext, { IComment } from "contexts/CommentsProvider";
import UserAvatar from "components/Header/Menu/UserAvatar";
import Reply from "components/Comment/Reply";

import { ISOToFull } from "lib/date-formats";
import Tooltips from "components/Tooltips";

export type CommentProps = {
  data: IComment;
  subcommentsLength: Number;
};

const Comment: React.FC<CommentProps> = ({ data, subcommentsLength }) => {
  const { collapseReplies, user } = useContext(CommentsContext);
  const [showFormReply, setShowFormReply] = useState(false);
  const [showReplies, setShowReplies] = useState(collapseReplies !== true);

  const renderReplies = () => {
    if (data.subcomments && data.subcomments.length) {
      const repliesJSX = data.subcomments.map(replyData => {
        return <Reply data={replyData} key={replyData.id} />;
      });
      return repliesJSX;
    }
    return null;
  };

  const [replies, setReplies] = useState(renderReplies());

  useEffect(() => {
    setReplies(renderReplies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcommentsLength]);

  const toggleReplies = () => {
    if (showFormReply) setShowFormReply(false);
    setShowReplies(prevShowReplies => !prevShowReplies);
  };
  const toggleShowFormReply = () => {
    if (showReplies) setShowReplies(false);
    setShowFormReply(prevShowFormReply => !prevShowFormReply);
  };

  const pluralizeReply = replies?.length === 1 ? " reply" : " replies";

  return (
    <Container sx={{ width: "100vw" }}>
      <Paper elevation={0} variant="outlined">
        <ListItem component="div">
          <Tooltips title="View Profile" placement="top">
            <IconButton>
              <UserAvatar size={40} />
            </IconButton>
          </Tooltips>
          <ListItemText
            primary={
              <Typography variant="caption">
                {data.from_admin
                  ? "The Raging Boss"
                  : data.author
                  ? data.author.username
                  : "Rage Quitter"}{" "}
                wrote, on {ISOToFull(data.createdAt)}
              </Typography>
            }
            primaryTypographyProps={{
              fontSize: 12,
              letterSpacing: 0,
            }}
          />
        </ListItem>
        <Divider />
        <ListItem component="div">
          <ListItemText
            primary={data.content}
            key={data.id}
            primaryTypographyProps={{
              color: "primary",
              fontWeight: "medium",
              variant: "body2",
            }}
          />
          {replies && replies.length ? (
            <Tooltips title={`See ${pluralizeReply}`} placement="left" arrow>
              <Button
                onClick={toggleReplies}
                sx={{
                  fontSize: 12,
                  letterSpacing: 1,
                }}
              >
                {replies.length} {pluralizeReply}
              </Button>
            </Tooltips>
          ) : (
            <Tooltips title="No replies yet" placement="left">
              <Button
                disabled
                sx={{
                  p: 0.2,
                  fontSize: 10,
                  pointerEvents: "none",
                }}
              >
                0 replies
              </Button>
            </Tooltips>
          )}
        </ListItem>

        <ListItem>
          {user && (
            <Tooltips title="Press to reply" placement="right">
              <Button
                component="span"
                variant="text"
                disableRipple
                disableTouchRipple
                endIcon={showFormReply ? <KeyboardArrowDown /> : <ArrowRight />}
                onClick={toggleShowFormReply}
                sx={{
                  fontSize: 12,
                  letterSpacing: 1,
                  ml: -1,
                }}
              >
                Reply
              </Button>
            </Tooltips>
          )}
        </ListItem>
        <ListItem>
          {showFormReply && (
            <FormReply commentID={data.id} closeForm={toggleShowFormReply} />
          )}
          {showReplies && <Box sx={{ overflowWrap: "break-word" }}>{replies}</Box>}
        </ListItem>
      </Paper>
    </Container>
  );
};

export default Comment;

interface FormReplyProps {
  commentID: number;
  closeForm: () => void;
}

const FormReply: React.FC<FormReplyProps> = ({ commentID, closeForm }) => {
  const { postReply } = useContext(CommentsContext);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
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
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100vw",
        }}
      >
        <TextField
          multiline
          autoFocus
          rows={3}
          variant="outlined"
          value={content}
          onChange={handleInput}
        />
        <Box
          sx={{
            display: "inherit",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={closeForm}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={content.length <= 0 || sending ? true : undefined}
          >
            {sending ? <CircularProgress size={20} /> : "Reply"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
