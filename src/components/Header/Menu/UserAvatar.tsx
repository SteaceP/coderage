import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

import { UserQuery } from "components/ApolloQuery";
import GET_USER_AVATAR_QUERY from "graphql/queries/query.getUserAvatar";

const UserAvatar = () => {
  return (
    <UserQuery query={GET_USER_AVATAR_QUERY}>
      {({ data }) => {
        if (!data.usersPermissionsUser.data.attributes.avatar.data) {
          return (
            <Avatar
              component={NavLink}
              to="/auth/dashboard"
              sx={{
                width: 32,
                height: 32,
                ml: 2.3,
              }}
              >
                {data.usersPermissionsUser.data.attributes.username[0]}
            </Avatar>
          );
        } else {
          const query =
            data.usersPermissionsUser.data.attributes.avatar.data.attributes;
            
          const avatarAlt = query.alternativeText || undefined;
          const avatarUrl = `${process.env.REACT_APP_BACKEND_URL}${query.formats.thumbnail.url}` || undefined;

          return (
            <Avatar
              component={NavLink}
              to="/auth/dashboard"
              src={avatarUrl}
              alt={avatarAlt}
              sx={{
                width: 32,
                height: 32,
                ml: 2.3,
              }}
            />
          );
        }
      }}
    </UserQuery>
  );
};

export default UserAvatar;
