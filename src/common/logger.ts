import { TransportMultiOptions, pino, Logger } from "pino";

const transport = pino.transport(<TransportMultiOptions>{
    targets: [
        {
            target: 'pino/file',
            level: 'error',
            options: {destination: './logs/error.txt', mkdir: true},
        },
        {
            target: 'pino/file',
            level: 'trace',
            options: {destination: './logs/all.txt', mkdir: true},
        },
        {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: true,
            }
        }
    ]
});

const logger: Logger = pino(transport);

export default logger;