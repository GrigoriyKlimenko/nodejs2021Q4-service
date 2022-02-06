import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { getLoggerOptions } from './common/logger/logger';

async function server() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(getLoggerOptions())
  });
  await app.listen(PORT, () => `Server started on port: ${PORT}`);
}
server();
