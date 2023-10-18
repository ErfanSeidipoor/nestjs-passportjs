import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategy';
import { entities } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariableTypeEnum } from 'src/enums';
import { GoogleStrategy } from './google.strategy';
import { DiscordStrategy } from './discord.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(
          EnvironmentVariableTypeEnum.JWT_SECRET,
        ),
        signOptions: { expiresIn: 30 * 24 * 60 * 60 + 's' }, // one month
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JWTStrategy,
    GoogleStrategy,
    DiscordStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
