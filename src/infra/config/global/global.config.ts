import { ConfigService } from '@nestjs/config';

export type GlobalConfigType = {
  host?: string;
  port?: number;
  pathEnv?: string;
  nodeEnv?: string;
  sentryDsn: string;
};

export default (): GlobalConfigType => ({
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 3000),
  pathEnv: process.env.PATH_ENV ?? '.env',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  sentryDsn: process.env.SENTRY_DSN,
});

export class GlobalConfig {
  constructor(private readonly config: ConfigService) {}
  get port(): number {
    return this.config.get<number>('PORT');
  }

  get host(): string {
    return this.config.get<string>('HOST');
  }

  get pathEnv(): string {
    return this.config.get<string>('PATH_ENV');
  }

  get nodeEnv(): string {
    return this.config.get<string>('NODE_ENV');
  }

  get sentryDsn(): string {
    return this.config.get<string>('SENTRY_DSN');
  }
}
