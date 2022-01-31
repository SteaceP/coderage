import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import Query from "../Query";
import AUTH_USER_QUERY from "../../graphql/queries/query.auth.user";

export const UserPicture = () => (
  <Query query={AUTH_USER_QUERY} slug={undefined}>
    {({ data: userPicture }) => {
      const picture =
        userPicture.usersPermissionsUser.data.attributes.picture.data.attributes
          .formats.thumbnail.url;

      const avatarAlt =
        userPicture.usersPermissionsUser.data.attributes.picture.data.attributes
          .alternativeText;

      const avatarUrl =
        process.env.NODE_ENV !== "development"
          ? picture
          : process.env.REACT_APP_BACKEND_URL + picture;

      return (
        <>
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
        </>
      );
    }}
  </Query>
);