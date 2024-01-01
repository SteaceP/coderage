import Cookie from "utils/cookie";

const { ApolloLink, ApolloClient, InMemoryCache, concat } = require("@apollo/client");
// const { createUploadLink } = require('apollo-upload-client');

//? Temporary deactivate the persistent cache
// import { cache } from "./apolloCache";

// const uploadLink = createUploadLink({
//   uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
// });

const authMiddleware = new ApolloLink((operation: { setContext: (arg0: ({ headers }: { headers?: {} | undefined; }) => { headers: { credentials: string; Authorization: string; "Content-Type": string; }; }) => void; }, forward: (arg0: any) => any) => {
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
          merge(existing: { data: any; }, incoming: { data: any; }) {
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
  // link: authMiddleware,
  uri: 'https://remove-me-soon.com/',
  connectToDevTools: (process.env.REACT_APP_ENABLE_APOLLO_DEV_TOOL === "true") ? true : false,

    // Optional constructor fields
    name: 'coderage-web-client',
    version: '0.1.1',
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
});

export default client;
