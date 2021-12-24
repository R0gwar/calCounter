import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { calCounterController } from './calCounter/calCounter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalCounter } from './calCounter/calCounter.entity';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { CategoriesService } from './calCounter/categories.service';
import { Categories } from './calCounter/categories.entity';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://admin1:admin2@cluster0.d4tre.mongodb.net/',
      database: "pipi",
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([CalCounter, Categories]),
    UsersModule, AuthModule],
  controllers: [AppController, calCounterController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
