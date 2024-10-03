import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';
import { Response } from 'express';
import { SentryConfig } from '@app/infra/config/sentry/sentry.config';
import { AppModule } from '@app/infra/ioc/app/app.module';
import { Swagger } from '@app/main/docs/swagger';
import { HttpExceptionsFilter } from '@app/ports/http/filters/http-exception.filter';
import { GlobalConfig } from '@app/infra/config/global/global.config';

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

  const port = new GlobalConfig(new ConfigService()).port;
  const host = new GlobalConfig(new ConfigService()).host;
  const nodeEnv = new GlobalConfig(new ConfigService()).nodeEnv;
  const sentryDsn = new GlobalConfig(new ConfigService()).sentryDsn;

  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health-check');
  });

  new SentryConfig(sentryDsn, nodeEnv).initial(app);

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  await app.listen(port, () =>
    logger.log(`Server running at: http://${host}:${port}/api/swagger`),
  );

  app.use(Sentry.Handlers.errorHandler());
}
bootstrap();
