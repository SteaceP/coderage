import {useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import {
    Routes,
    BrowserRouter,
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./lib/apolloClient";
import "assets/fonts";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing({
    routingInstrumentation: Sentry.reactRouterV6Instrumentation(
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
  ),
  })],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const container = document.getElementById('app');
const root = createRoot(container!);
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <SentryRoutes>
        <App />
      </SentryRoutes>
    </BrowserRouter>
  </ApolloProvider>
  );
