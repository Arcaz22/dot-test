import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Content, JsonPlaceholderModule, LoggingModule, PostgresModule, PostModule } from '@app/my-library';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    PostgresModule,
    JsonPlaceholderModule,
    LoggingModule,
    TypeOrmModule.forFeature([Content]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
