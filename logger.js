const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'exercise-app' },
  transports: [
    new LokiTransport({
      host: process.env.LOKI_HOST || 'http://loki:3100',
    }),
  ],
});

module.exports = {
  logger
}
  