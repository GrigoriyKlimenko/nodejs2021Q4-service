import { TransportMultiOptions, pino, Logger } from "pino";
import { LOG_LEVEL } from './config';

const transport = pino.transport(<TransportMultiOptions>{
    targets: [
        {
            target: 'pino/file',
            level: 'error',
            options: {
                destination: './logs/error.txt', 
                mkdir: true,
                ignore: 'pid,hostname',
            }
        },
        {
            target: 'pino/file',
            level: LOG_LEVEL,
            options: {
                destination: './logs/all.txt', 
                mkdir: true,
                ignore: 'pid,hostname'
            },
        },
        {
            target: 'pino-pretty',
            level: LOG_LEVEL,
            options: {
              colorize: true,
              translateTime: true,
              ignore: 'pid,hostname',
            },
        }
    ]
});

const logger: Logger = pino({level: LOG_LEVEL}, transport);

export default logger;