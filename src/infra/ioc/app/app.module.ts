import { Module } from '@nestjs/common';
import { ConfigureModule } from '../../../infra/configure/configure.module';
import { HealthCheckModule } from '../health-check/health-check.module';

@Module({
  imports: [ConfigureModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
