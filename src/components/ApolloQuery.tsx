import { useQuery } from "@apollo/client";

import { useAuthState } from "contexts/AuthContext";
import CircularLoading from "./Loading";

//TODO: add more types and find a way to make this more generic

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
  const id = user?.id ? user!.id : undefined;

  const { data, loading, error } = useQuery(query, {
    variables: { id: id },
  });

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};
