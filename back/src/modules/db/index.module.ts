import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule as InnerTypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../entities';
import { EnvironmentVariableTypeEnum } from '../../enums';
@Module({
  imports: [
    InnerTypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get(EnvironmentVariableTypeEnum.TYPEORM_HOST),
          username: config.get(EnvironmentVariableTypeEnum.TYPEORM_USERNAME),
          password: config.get(EnvironmentVariableTypeEnum.TYPEORM_PASSWORD),
          database: config.get(EnvironmentVariableTypeEnum.TYPEORM_DATABASE),
          port: config.get<number>(EnvironmentVariableTypeEnum.TYPEORM_PORT),
          synchronize: true,
          entities,
        };
      },
    }),
  ],
})
export class TypeOrmModule {}
