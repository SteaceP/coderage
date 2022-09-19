import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  FormLabel,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  ListItemIcon,
  Divider,
} from "@mui/material";

import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import UserAvatar from "components/Header/Menu/UserAvatar";

import { ISOToFull } from "lib/date-formats";

import CommentsContext, { IComment } from "contexts/CommentsProvider";
import Reply from "./Reply";

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

  const [replies, setReplies] = useState(renderReplies());

  useEffect(() => {
    setReplies(renderReplies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcommentsLength]);

  const toggleReplies = () => {
    if (showFormReply) setShowFormReply(false);
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };
  const toggleShowFormReply = () => {
    if (showReplies) setShowReplies(false);
    setShowFormReply((prevShowFormReply) => !prevShowFormReply);
  };

  return (
    <Box
      sx={{
        width: "60vw",
        "& .MuiTextField-root": { m: 1, width: "50vw" },
        "& .MuiBox-root .MuiListItem-root": {
          // TextArea with the reply text and the 2 buttons
          display: "inherit",
          flexDirection: "column",
          alignContent: "flex-end",
          ml: 4.2,
        },
        "& .MuiBox-root .MuiListItem-root .css-iz5a6l": {
          // Only Reply
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-end",
          justifyContent: "flex-end",
          ml: 4.2,
        },
      }}
    >
      <Paper elevation={0} variant="outlined">
        <ListItem component="div">
          <ListItemIcon sx={{ fontSize: 25 }}>
            <UserAvatar size={28} />
          </ListItemIcon>
          <ListItemText
            sx={{ my: 0, ml: -1.5 }}
            primary={
              <Typography variant="caption">
                {data?.from_admin
                  ? "Admin"
                  : data?.author
                  ? data?.author.username
                  : "User"}{" "}
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
            <Button
              onClick={toggleReplies}
              sx={{
                p: 0.2,
                fontSize: 10,
              }}
            >
              {replies.length} {replies.length === 1 ? " reply" : " replies"}
            </Button>
          ) : (
            <Button
              disabled
              sx={{
                p: 0.2,
                fontSize: 10,
              }}
            >
              0 replies
            </Button>
          )}
        </ListItem>

        <ListItem>
          {user && (
            <Button
              variant="text"
              disableRipple
              endIcon={showFormReply ? <KeyboardArrowDown /> : <ArrowRight />}
              component="span"
              onClick={toggleShowFormReply}
              sx={{
                fontSize: 10,
                letterSpacing: 0,
                p: 0.2,
              }}
            >
              Reply
            </Button>
          )}
        </ListItem>
        <ListItem>
          {showFormReply && (
            <FormReply
              commentID={data.id}
              closeForm={() => setShowFormReply(false)}
            />
          )}
          {showReplies && (
            <Box sx={{ overflowWrap: "break-word" }}>{replies}</Box>
          )}
        </ListItem>
      </Paper>
    </Box>
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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "80vw",
      }}
    >
      <ListItem>
        <FormLabel>Reply</FormLabel>
        <TextField
          multiline
          autoFocus
          rows={4}
          variant="outlined"
          value={content}
          onChange={handleInput}
        />
        <Box>
          <Button onClick={closeForm}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={sending}>
            {sending ? <CircularProgress size={20} /> : "Reply"}
          </Button>
        </Box>
      </ListItem>
    </Box>
  );
};
