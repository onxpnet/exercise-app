"use strict";

if (process.env.NODE_ENV !== "production") {
    return;
}

const {
    BasicTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const {
    SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
    getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");


const exporter = new OTLPTraceExporter({
    url: process.env.OTEL_URL || "https://ot-collector.ops.onxp.net/v1/traces"
});

const provider = new BasicTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]:
            "onxp-exercise-app",
    }),
});

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const sdk = new opentelemetry.NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations({ '@opentelemetry/instrumentation-fs': { enabled: false } })],
});

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

sdk.start();