import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import client from "./lib/apolloClient";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <HelmetProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </HelmetProvider>
);
