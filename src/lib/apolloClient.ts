import { HttpLink, ApolloLink, ApolloClient, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Cookie from "js-cookie";

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

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookie.get("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: from([authMiddleware, errorLink.concat(httpLink)]),
  connectToDevTools: true, //? Gives access to the Apollo Client DevTools in production
});

export default client;
