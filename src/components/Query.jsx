import { useQuery, useMutation } from "@apollo/client";
import CircularLoading from "./Loading";

const Query = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const Mutation = ({ children, query, slug }) => {
  const { data, loading, error } = useMutation(query);

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export default Query;
