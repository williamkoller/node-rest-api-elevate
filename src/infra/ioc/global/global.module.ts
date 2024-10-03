import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConf, {
  GlobalConfig,
} from '@app/infra/config/global/global.config';

const pathEnv = process.env.PATH_ENV || '.env';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: pathEnv,
      load: [globalConf],
    }),
  ],
  providers: [GlobalConfig],
})
export class GlobalModule {}
