import { useQuery } from "@apollo/client";

import { useAuthState } from "contexts/AuthContext";
import CircularLoading from "./Loading";
import { ArticleSkeleton } from "../components/Skeleton";

//TODO: add more types and find a way to make this more generic

interface QueryIsFeaturedProps {
  attributes: {
    title: string;
    description: string;
    synopsis: string;
    slug: string;
    isFeatured: boolean;
    publishedAt: string;
    category: {
      data: {
        attributes: {
          Name: string;
        };
      };
    };
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export const HomePageQuery = ({ children, query }) => {
  const { data, loading, error } = useQuery<QueryIsFeaturedProps>(query);

  if (loading) return <CircularLoading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>No data!</p>;
  return children({ data });
};

export const GetPostsQuery = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading) return <ArticleSkeleton />;
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
