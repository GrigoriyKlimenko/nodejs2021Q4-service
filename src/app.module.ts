import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/exceptionsFilters/allExceptions.filter';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';

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
      synchronize: false,
      migrationsRun: true,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    UsersModule,
    TasksModule,
    BoardsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
