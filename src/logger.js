import winston from 'winston';
const { createLogger, format, transports } = winston;

export const Logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.splat(), format.json()),
  transports: [
    new transports.File({ filename: process.env.LOG_FILE_PATH + '/log' }),
    new transports.Console()
  ]
});
