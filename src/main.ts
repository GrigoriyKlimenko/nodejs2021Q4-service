import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function server() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => `Server started on port: ${PORT}`);
}
server();
