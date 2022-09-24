import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import client from "./lib/apolloClient";
// import ErrorBoundary from "react-error-boundaries";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  // <ErrorBoundary>
  <CacheProvider value={muiCache}>
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>
  </CacheProvider>
  // </ErrorBoundary>
);

serviceWorkerRegistration.register();
