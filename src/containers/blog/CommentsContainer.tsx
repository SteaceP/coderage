import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
} from "@mui/material";
import { useUIDSeed } from "react-uid";

import DividerWithCenterText from "components/DividerWithCenterText";

import COMMENTS_FLAT_QUERY from "graphql/queries/query.getComments";
import GET_USER_AVATAR_QUERY from "graphql/queries/query.getUserAvatar";
import {
  GetCommentsQuery,
  GetUserAvatarForComments,
} from "components/ApolloQuery";

type CommentsContainerProps = {
  postId: string;
};

const CommentsContainer = (props: CommentsContainerProps) => {
  const { postId } = props;
  const uid = useUIDSeed();

  return (
    <>
      <DividerWithCenterText>Comments</DividerWithCenterText>
      <GetCommentsQuery
        query={COMMENTS_FLAT_QUERY}
        postID={`api::post.post:${postId}`}
      >
        {({ data }) => {
          const comments = data.findAllFlat.data;

          if (!comments.length)
            return (
              <Typography>No Comment yet, start the conversation.</Typography>
            );

          return (
            <List
              dense
              sx={{
                maxWidth: 900,
                my: 3,
              }}
            >
              {comments.map((comment: any) => (
                <>
                  <ListItem key={uid(comment)} alignItems="flex-start">
                    <GetUserAvatarForComments //! Probably not a good idea, but the only one that came to mind (I'll need to rewrite the backend before changing this)
                      query={GET_USER_AVATAR_QUERY}
                      userID={comment.author.id}
                    >
                      {({ data }) => {
                        const avatar =
                          data.usersPermissionsUser.data.attributes.avatar.data
                            .attributes;

                        return (
                          <ListItemAvatar>
                            <Avatar
                              alt={avatar.alternativeText}
                              src={`${process.env.REACT_APP_BACKEND_URL}${avatar.formats.thumbnail.url}`}
                            />
                          </ListItemAvatar>
                        );
                      }}
                    </GetUserAvatarForComments>

                    <ListItemText
                      primary={comment.author.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ maxWidth: 50 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.content}
                          </Typography>
                        </>
                      }
                    />

                    <ListItemSecondaryAction>
                      <ListItemButton
                        disableGutters
                        sx={{
                          display: "none", //TODO: make the button smaller and find a better place
                        }}
                      >
                        Reply
                      </ListItemButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component={"li"} />
                </>
              ))}
            </List>
          );
        }}
      </GetCommentsQuery>
    </>
  );
};

export default CommentsContainer;
