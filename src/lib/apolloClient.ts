import { ApolloLink, ApolloClient, concat } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "utils/cookie";

import { cache } from "./apolloCache";

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookie.get("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      credentials: "include",
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json;charset=UTF-8",
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, uploadLink),
  connectToDevTools: true, //? Gives access to the Apollo Client DevTools in production
});

export default client;
