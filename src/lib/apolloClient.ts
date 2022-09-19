import { ApolloLink, ApolloClient, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "utils/cookie";

import { cache } from "./apolloCache";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookie.get("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json;charset=UTF-8",
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: from([authMiddleware, errorLink.concat(uploadLink)]),
  connectToDevTools: true, //? Gives access to the Apollo Client DevTools in production
});

export default client;
