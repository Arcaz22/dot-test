import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createDocument } from '@app/my-library';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');
    createDocument(app);

    await app.listen(port);
  }
  bootstrap();
