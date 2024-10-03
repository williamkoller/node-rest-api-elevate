import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentryInterceptor } from '../../interceptors/sentry.interceptor';
import { CustomSentryInterceptor } from '../../interceptors/custom-sentry.interceptor';

@ApiTags('health-check')
@Controller('health-check')
@UseInterceptors(SentryInterceptor, CustomSentryInterceptor)
export class HealthCheckController {
  @Get()
  @ApiOperation({
    summary: 'Health Check',
  })
  @ApiOkResponse({
    description: 'Health Check',
    content: {
      'application/json': {
        example: {
          message: 'Health check is OK!',
        },
      },
    },
  })
  healthCheck() {
    // return 'Health check is OK!';
    throw new Error('Health check is not OK!');
  }
}
