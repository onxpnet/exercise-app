const express = require("express");
const cors = require('cors')
const { cpuIntensiveTask } = require('./command');
const Sentry = require("@sentry/node");
require("@opentelemetry/api");

const app = express();

app.use(cors());

app.all("/", (req, res) => {
  res.json({ method: req.method, message: "Hello OnXP", ...req.body });
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

// Error handled
app.use((err, req, res, next) => {
  console.log("Catched by Sentry on uncaughtException");
  Sentry.captureException(err);
  res.status(500).send('Something broke!');
});

process.on('unhandledRejection', (reason, promise) => {
  console.log("Catched by Sentry on unhandledRejection");
  Sentry.captureException(reason);
});

process.on('uncaughtException', (err) => {
  console.log("Catched by Sentry on uncaughtException");
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