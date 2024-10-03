import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/ioc/app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Swagger } from './main/docs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';
import { SentryConfig } from './infra/config/sentry.config';
import { HttpExceptionsFilter } from './ports/http/filters/http-exception.filter';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    cors: true,
    autoFlushLogs: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionsFilter());
  Swagger.setup(app);

  const port = app.get<ConfigService>(ConfigService).get<number>('PORT');
  const host = app.get<ConfigService>(ConfigService).get<string>('HOST');

  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health-check');
  });

  SentryConfig.initial(new ConfigService(), app);

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  await app.listen(port, () =>
    logger.log(`Server running at: http://${host}:${port}/api/swagger`),
  );

  app.use(Sentry.Handlers.errorHandler());
}
bootstrap();
