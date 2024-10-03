import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CompositeSentryInterceptor } from '@app/ports/http/interceptors/composite-sentry.interceptor';
import { CustomSentryInterceptor } from '@app/ports/http/interceptors/custom-sentry.interceptor';
import { SentryInterceptor } from '@app/ports/http/interceptors/sentry.interceptor';
import { SentryMiddleware } from '@app/infra/middleware/sentry.middleware';
import { GlobalModule } from '@app/infra/ioc/global/global.module';
import { HealthCheckModule } from '@app/infra/ioc/health-check/health-check.module';

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
