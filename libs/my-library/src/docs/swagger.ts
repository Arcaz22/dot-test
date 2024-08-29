import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createDocument(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(SWAGGER_CONFIG.title)
      .setDescription(SWAGGER_CONFIG.description)
      .setVersion(SWAGGER_CONFIG.version)
      .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
