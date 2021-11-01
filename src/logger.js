import { sep } from 'path';
import winston from 'winston';
const { createLogger, format, transports } = winston;

const logFileName = 'log';
const filename = `${process.env.LOG_FILE_PATH}${sep}${logFileName}`;
const consoleTransport = new transports.Console();

export const Logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.splat(), format.json()),
  transports: [new transports.File({ filename }), consoleTransport]
});

if (process.env.NODE_ENV === 'test') {
  Logger.remove(consoleTransport);
}
