import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/ioc/app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Swagger } from './main/docs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = app.get<ConfigService>(ConfigService).get<number>('PORT');
  const host = app.get<ConfigService>(ConfigService).get<string>('HOST');

  app.setGlobalPrefix('api');

  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health-check');
  });

  Swagger.setup(app);

  await app.listen(port, () =>
    logger.log(`Server running at: http://${host}:${port}/api/swagger`),
  );
}
bootstrap();
