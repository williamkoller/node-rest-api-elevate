import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';

export class SentryConfig {
  public static initial(
    configService: ConfigService,
    app: NestExpressApplication,
  ): void {
    Sentry.init({
      dsn: configService.get<string>('SENTRY_DSN'),
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app: app as any }),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: configService.get<string>('NODE_ENV'),
    });
  }
}
