import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: Logger
      ) { }


  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const queryParams = JSON.stringify(request.query);
      const bodyData = JSON.stringify(request.body);

      this.logger.log(
        `${method} ${url} ${statusCode} / Query params: ${queryParams}; Body: ${bodyData} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}