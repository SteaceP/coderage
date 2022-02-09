import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

import { UserQuery } from "components/ApolloQuery";
import AUTH_USER_GETPICTURE from "graphql/queries/query.auth.userPicture";

const UserPicture = () => {
  return (
    <UserQuery query={AUTH_USER_GETPICTURE}>
      {({ data }) => {
        if (!data.usersPermissionsUser.data.attributes.picture.data) {
          return (
            <Avatar
              component={NavLink}
              to="/auth/dashboard"
              sx={{
                width: 32,
                height: 32,
                ml: 2.3,
              }}
            />
          );
        } else {
          const query =
            data.usersPermissionsUser.data.attributes.picture.data.attributes;

          const avatarAlt = query.alternativeText;
          const avatarUrl = `${process.env.REACT_APP_BACKEND_URL}${query.formats.thumbnail.url}`;

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

export default UserPicture;
