import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      // migrationsRun: true,
      entities: [path.join(__dirname, '/resources/**/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    UsersModule,
    TasksModule,
    BoardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
