const express = require("express");
const cors = require('cors')
const { cpuIntensiveTask } = require('./command');
const { logger } = require('./logger');
const Sentry = require("@sentry/node");
require("@opentelemetry/api");

const { reqCounter, reqDuration } = require('./metrics');

const app = express();

app.use(cors());

app.all("/", (req, res) => {
  res.json({ method: req.method, message: "Hello Exercise App", ...req.body });
});

app.all("/version", (req, res) => {
  res.json({ method: req.method, message: "On Version latest", ...req.body });
});

app.all("/error", (req, res) => {
  throw new Error("An error occurred");
});

// init sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
});

app.use((req, res, next) => {
  const start = process.hrtime.bigint(); 

  // separate counter for each route
  reqCounter.add(1, { method: req.method, route: req.route });

  // count all requests
  reqCounter.add(1, { route: 'all' });

  // send log to Loki
  logger.info('Received request', {
    url: req.url,
    method: req.method,
    headers: req.headers,
  });

  res.on('finish', () => {
    const duration = process.hrtime.bigint() - start; // calculate duration in nanoseconds
    const durationInMilliseconds = Number(duration) / 1e6; // convert duration to milliseconds

    // record http response time to histogram
    reqDuration.record(durationInMilliseconds, { method: req.method, route: req.route, code: res.statusCode });
  });

  next();
});

// Error handled
app.use((err, req, res, next) => {
  console.log("Catched by Sentry on uncaughtException");

  // log to sentry
  Sentry.captureException(err);

  // log to loki
  logger.error('An error occurred', {
    message: err.message,
    stack: err.stack,
  });
  
  console.log(err);
  res.status(500).send('Something broke!');
});

process.on('unhandledRejection', (reason, promise) => {
  console.log("Catched by Sentry on unhandledRejection: ", reason);
  Sentry.captureException(reason);
});

process.on('uncaughtException', (err) => {
  console.log("Catched by Sentry on uncaughtException: ", err);
  Sentry.captureException(err);
});

app.get('/intensive', (req, res) => {
  // Call the CPU-intensive task function
  cpuIntensiveTask((result) => {
    console.log(result);
    res.json({ method: req.method, message: "Running intensive CPU Task. Please wait...", ...req.body });
  });
});

const port = process.env.APP_PORT || "3000";
app.listen(port, function() {
    console.log('server running on port ' + port + '.');
});