import { useQuery } from "@apollo/client";
import { Avatar, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import GET_USER_AVATAR_QUERY from "graphql/queries/query.getUserAvatar";
import { useAuthState } from "contexts/AuthContext";

type UserAvatarProps = {
  size: number;
};

const UserAvatar: React.FunctionComponent<UserAvatarProps> = (props) => {
  const { size } = props;
  const { user } = useAuthState();

  const { loading, data } = useQuery(GET_USER_AVATAR_QUERY, {
    variables: { id: user?.id },
  });

  if (loading)
    return <Skeleton variant="circular" width={size} height={size} />;
  // if (!data) return <p>No data!</p>;

  const avatar = data?.usersPermissionsUser?.data?.attributes?.avatar;

  if (!avatar) {
    return (
      <NavLink to={`/auth/dashboard`}>
        <Avatar sx={{ width: size, height: size }}>
          <AccountCircleIcon />
        </Avatar>
      </NavLink>
    );
  }

  const avatarUrl = avatar?.data?.attributes?.formats?.thumbnail?.url;
  const avatarAlt = avatar?.data?.attributes?.alternativeText;

  return (
    <NavLink to="/auth/dashboard">
      <Avatar
        alt={avatarAlt}
        src={avatarUrl}
        sx={{ width: size, height: size }}
      />
    </NavLink>
  );
};

export default UserAvatar;
