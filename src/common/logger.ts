import { TransportMultiOptions, pino, Logger } from "pino";
import { LOG_LEVEL } from './config';

/**
   * function to represent level
   * @param level - param with level in numeric representation
   * @returns level in literal representation
*/
const getLogLevel = (level: string) => {
    switch (level) {
        case '1':
            return 'fatal';
        case '2':
            return 'error';
        case '3':
            return 'warn';
        case '4':
            return 'info';
        case '5':
            return 'debug';
        case '6':
            return 'trace';
        default:
            return 'info';
    }
}

const transport = pino.transport(<TransportMultiOptions>{
    targets: [
        {
            target: 'pino/file',
            level: 'error',
            options: {
                destination: './logs/error.txt',
                mkdir: true,
                translateTime: true,
                ignore: 'pid,hostname',
            }
        },
        {
            target: 'pino/file',
            level: getLogLevel(LOG_LEVEL),
            options: {
                destination: './logs/all.txt',
                mkdir: true,
                translateTime: true,
                ignore: 'pid,hostname'
            },
        },
        {
            target: 'pino-pretty',
            level: getLogLevel(LOG_LEVEL),
            options: {
                colorize: true,
                translateTime: true,
                ignore: 'pid,hostname',
            },
        }
    ]
});

const logger: Logger = pino({ level: getLogLevel(LOG_LEVEL) }, transport);

export default logger;