import { useQuery } from "@apollo/client";

import { useAuthState } from "contexts/AuthContext";
import CircularLoading from "./Loading";

export const HomePageQuery = ({ children, query }) => {
  const { data, loading, error } = useQuery(query);

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const GetPostsQuery = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const UserQuery = ({ children, query }) => {
  const { user } = useAuthState();
  const userID = user.id ? user.id : undefined;

  const { data, loading, error } = useQuery(query, {
    variables: { userID: userID },
  });

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};
