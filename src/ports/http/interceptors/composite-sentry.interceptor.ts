import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SentryInterceptor } from './sentry.interceptor';
import { CustomSentryInterceptor } from './custom-sentry.interceptor';

@Injectable()
export class CompositeSentryInterceptor implements NestInterceptor {
  constructor(
    private readonly sentryInterceptor: SentryInterceptor,
    private readonly customSentryInterceptor: CustomSentryInterceptor,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return this.sentryInterceptor.intercept(context, {
      handle: () => this.customSentryInterceptor.intercept(context, next),
    });
  }
}
