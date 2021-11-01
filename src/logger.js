import { sep } from 'path';
import winston from 'winston';
const { createLogger, format, transports } = winston;

const logFileName = 'log';
const filename = `${process.env.LOG_FILE_PATH}${sep}${logFileName}`;

export const Logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.splat(), format.json()),
  transports: [new transports.File({ filename }), new transports.Console()]
});
