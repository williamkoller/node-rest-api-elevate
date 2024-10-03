import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const pathEnv = process.env.PATH_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: pathEnv ?? '.env.development.local',
    }),
  ],
})
export class GlobalModule {}
