import Cookie from "utils/cookie";

const {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  concat,
} = require("@apollo/client");

const httpLink = new HttpLink({ uri: "/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token: string | null = Cookie.get("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "credentials": "include",
      "Authorization": token ? `Bearer ${token}` : null,
      "Content-Type": "application/json;charset=UTF-8",
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
  connectToDevTools:
    process.env.REACT_APP_ENABwLE_APOLLO_DEV_TOOL === "true" ? true : false,

  // Optional constructor fields
  name: "coderage-web-client",
  version: "0.1.1",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
