import * as winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine( winston.format.colorize(), winston.format.simple()),
      level: 'debug'
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ]
});