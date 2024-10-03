import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/node';

export class SentryConfig {
  constructor(
    private readonly sentryDsn: string,
    private readonly nodeEnv: string,
  ) {}
  public initial(app: NestExpressApplication): void {
    Sentry.init({
      dsn: this.sentryDsn,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({
          app: app as any,
        }),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: this.nodeEnv,
    });
  }
}
