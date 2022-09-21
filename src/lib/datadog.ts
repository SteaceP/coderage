import "@datadog/browser-logs/bundle/datadog-logs";

window.DD_LOGS.init({
  clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
  site: process.env.REACT_APP_DATADOG_SITE,
  forwardErrorsToLogs: true,
  sampleRate: 100,
  env: process.env.NODE_ENV,
  telemetrySampleRate: 0,
  beforeSend: (log: any) => {
    // remove email from view url
    log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED");
    // discard 404 network errors
    if (log.http && log.http.status_code === 404) return false;
  },
});
