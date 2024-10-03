import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CompositeSentryInterceptor } from '../../../ports/http/interceptors/composite-sentry.interceptor';
import { CustomSentryInterceptor } from '../../../ports/http/interceptors/custom-sentry.interceptor';
import { SentryInterceptor } from '../../../ports/http/interceptors/sentry.interceptor';
import { SentryMiddleware } from '../../middleware/sentry.middleware';
import { GlobalModule } from '../global/global.module';
import { HealthCheckModule } from '../health-check/health-check.module';

@Module({
  imports: [GlobalModule, HealthCheckModule],
  controllers: [],
  providers: [
    SentryInterceptor,
    CustomSentryInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: CompositeSentryInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
