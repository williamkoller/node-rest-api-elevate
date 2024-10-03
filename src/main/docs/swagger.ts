import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  public static setup(app: NestExpressApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Node Rest API Elevate')
      .setDescription('The Node Rest API Elevate description')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
  }
}
