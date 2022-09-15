import { ISubcomment } from "./CommentsProvider";
import { ISOToFull } from "lib/date-formats";
import {
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

export interface ReplyProps {
  data: ISubcomment;
}

const Reply = ({ data }: ReplyProps) => {
  const authorLabel = data.from_admin
    ? "Admin"
    : data.author
    ? data.author.username
    : "User";

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 1,
          ml: 2,
        }}
      >
        <Typography gutterBottom>{authorLabel}</Typography>
        <Typography
          variant="caption"
          sx={{
            display: "inherit",
            alignItems: "center",
            ml: 1.5,
          }}
        >
          on {ISOToFull(data.createdAt)}
        </Typography>
      </Box>
      <Typography
        gutterBottom
        sx={{
          ml: 3,
        }}
      >
        {data.content}
      </Typography>
    </>
  );
};

export default Reply;
