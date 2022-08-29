import { useQuery } from "@apollo/client";

import { useAuthState } from "contexts/AuthContext";
import CircularLoading from "./Loading";

export const HomePageQuery = ({ children, query }) => {
  const { data, loading, error } = useQuery(query);

  if (loading) return <CircularLoading />;
  if (error) return console.error(`(Apollo)HomePageQuery: ${error}`);
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const GetPostsQuery = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading) return <CircularLoading />;
  if (error) return console.error(`(Apollo)GetPostsQuery: ${error}`);
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const UserQuery = ({ children, query }) => {
  const { user } = useAuthState();
  const id = user.id ? user.id : undefined;

  const { data, loading, error } = useQuery(query, {
    variables: { id: id },
  });

  if (loading) return <CircularLoading />;
  if (error) return console.error(`(Apollo)UserQuery: ${error}`);
  if (!data) return <p>No data!</p>;
  return children({ data });
};
