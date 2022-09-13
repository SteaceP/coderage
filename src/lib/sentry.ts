import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { wrapUseRoutes } from "@sentry/react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
  useRoutes,
} from "react-router-dom";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  beforeSend(event, hint) {
    // https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/user-feedback/
    //TODO: need more work
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
  tracesSampleRate: 1.0,
});

export const useSentryRoutes = wrapUseRoutes(useRoutes);
