import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthCheckModule } from '../health-check/health-check.module';
import { GlobalModule } from '../global/global.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryMiddleware } from '../../middleware/sentry.middleware';
import { SentryInterceptor } from '../../../ports/http/interceptors/sentry.interceptor';
import { SentryConfig } from '../../config/sentry.config';

@Module({
  imports: [GlobalModule, HealthCheckModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
    SentryConfig,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
