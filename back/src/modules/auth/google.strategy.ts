import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariableTypeEnum } from 'src/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get(EnvironmentVariableTypeEnum.GOOGLE_CLIENT_ID),
      clientSecret: configService.get(
        EnvironmentVariableTypeEnum.GOOGLE_CLIENT_SECRET,
      ),
      callbackURL:
        configService.get(EnvironmentVariableTypeEnum.SERVER_URL) +
        '/auth/login/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      _json: {
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        email: string;
        email_verified: true;
        locale: 'en';
      };
    },
  ) {
    const {
      _json: { email, name, picture },
    } = profile;

    let user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      user = await this.userRepo.create();
    }

    user.email = email;
    user.fullName = name;
    user.picture = picture;

    await user.save();
    return user;
  }
}
