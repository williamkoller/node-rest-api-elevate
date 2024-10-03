import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

@Injectable()
export class CustomSentryInterceptor extends SentryInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return super.intercept(context, next).pipe(
      catchError((error) => {
        Sentry.captureException(error);

        return Promise.reject(
          error instanceof Error ? error : new Error(error),
        );
      }),
    );
  }
}
