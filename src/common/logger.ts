import * as winston from 'winston';
import { utilities } from 'nest-winston';
import { LOG_LEVEL } from './config';

const getLogLevel = (level: string) => {
    switch (level) {
        case '0':
            return 'error';
        case '1':
            return 'warn';
        case '2':
            return 'info';
        case '3':
            return 'http';
        case '4':
            return 'verbose';
        case '5':
            return 'debug';
        case '6':
            return 'silly';
        default:
            return 'info';
    }
}

export const getLoggerOptions = () => ({
        level: getLogLevel(LOG_LEVEL),
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    utilities.format.nestLike(),
                ),
            }),
            new winston.transports.File({ filename: './logs/log.txt', level: 'info' }),
            new winston.transports.File({ filename: './logs/error.txt', level: 'error' }),
        ],
    })