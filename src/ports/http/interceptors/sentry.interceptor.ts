import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);

        if (error instanceof HttpException) {
          const response = error.getResponse();
          const responseBody =
            response instanceof Object ? response : { message: response };

          Sentry.withScope((scope) => {
            scope.setExtras({ responseBody });
            Sentry.captureException(error);
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
