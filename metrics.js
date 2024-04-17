
// prometheus metrics
const { MeterProvider, MetricReader } = require('@opentelemetry/sdk-metrics-base');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { NodeTracerProvider } = require('@opentelemetry/node');

const nodeProvider = new NodeTracerProvider();
nodeProvider.register();

// Set up the Prometheus exporter
const promExporter = new PrometheusExporter({ startServer: true }, () => {
  console.log("Prometheus scrape endpoint running on port 9464");
});

const meterProvider = new MeterProvider({
  exporter: promExporter,
  interval: 2000,
  readers: [new MetricReader(promExporter)],
});

meterProvider.addMetricReader(promExporter);

const meter = meterProvider.getMeter('exercise-app');

// Create a counter metric
const reqCounter = meter.createCounter('request_counter', {
  description: 'Counts the number of HTTP requests',
});

// Create a value recorder metric
const reqDuration = meter.createHistogram('http_request_duration_microseconds', {
  description: 'Duration of HTTP requests in microseconds',
});

module.exports = {
  reqCounter,
  reqDuration
};