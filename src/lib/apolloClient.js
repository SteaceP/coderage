import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  concat,
} from "@apollo/client";
import Cookie from "js-cookie";

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

// Add JWT to the headers on every GraphQL requests if a user is logged in
// Or if the user has already logged in and the cookie is not expired.
//TODO: I just removed the auth token in the ELSE, find a cleaner way
const authMiddleware = new ApolloLink((operation, forward) => {
  let token = Cookie.get("token");
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));
    return forward(operation);
  } else {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
      },
    }));
    return forward(operation);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
