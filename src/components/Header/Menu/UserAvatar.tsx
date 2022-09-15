import { useQuery } from "@apollo/client";
import { Avatar, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import GET_USER_AVATAR_QUERY from "graphql/queries/query.getUserAvatar";
import { useAuthState } from "contexts/AuthContext";

const UserAvatar: React.FunctionComponent = () => {
  const { user } = useAuthState();

  const { loading, data } = useQuery(GET_USER_AVATAR_QUERY, {
    variables: { id: user.id },
  });

  if (loading) return <Skeleton variant="circular" width={32} height={32} />;
  // if (!data) return <p>No data!</p>;

  const avatar = data?.usersPermissionsUser?.data?.attributes?.avatar;

  if (!avatar) {
    return (
      <NavLink to={`/auth/dashboard`}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <AccountCircleIcon />
        </Avatar>
      </NavLink>
    );
  }

  const avatarUrl = avatar?.data?.attributes?.formats?.thumbnail?.url;
  const avatarAlt = avatar?.data?.attributes?.alternativeText;

  return (
    <NavLink to="/auth/dashboard">
      <Avatar alt={avatarAlt} src={avatarUrl} sx={{ width: 32, height: 32 }} />
    </NavLink>
  );
};

export default UserAvatar;
