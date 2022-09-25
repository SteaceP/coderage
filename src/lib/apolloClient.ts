import { ApolloLink, ApolloClient, concat } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "utils/cookie";

//? Temporary deactivate the persistent cache
// import { cache } from "./apolloCache";

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookie.get("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "credentials": "include",
      "Authorization": token ? `Bearer ${token}` : "",
      "Content-Type": "application/json;charset=UTF-8",
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: "Post",
              id: args?.id,
            });
          },
          keyArgs: ["filters"],
          merge(existing, incoming) {
            //? This is a test for something that I'll add sooner or later doesn't do much right now
            return {
              ...incoming,
              data: [...(existing?.data || []), ...incoming.data],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, uploadLink),
  connectToDevTools: true, //? Gives access to the Apollo Client DevTools in production
});

export default client;
