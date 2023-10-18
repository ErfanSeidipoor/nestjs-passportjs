import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariableTypeEnum } from 'src/enums';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

config();

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get(
        EnvironmentVariableTypeEnum.DISCORD_CLIENT_ID,
      ),
      clientSecret: configService.get(
        EnvironmentVariableTypeEnum.DISCORD_CLIENT_SECRET,
      ),
      callbackURL:
        configService.get(EnvironmentVariableTypeEnum.SERVER_URL) +
        '/auth/login/discord/callback',
      scope: ['identify'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
      flags: number;
      banner?: string;
      accent_color: number;
      global_name: string;
      avatar_decoration_data?: string;
      banner_color?: string;
      mfa_enabled: boolean;
      locale?: string;
      premium_type: number;
      provider: 'discord';
      accessToken?: string;
      fetchedAt: string;
    },
  ) {
    const { id, username, avatar, banner_color, global_name } = profile;

    let user = await this.userRepo.findOne({
      where: {
        discordId: id,
      },
    });

    if (!user) {
      user = await this.userRepo.create();
    }
    user.fullName = global_name;
    user.discordBannerColor = banner_color;
    user.discordUsername = username;
    user.discordId = id;
    user.username = username;
    user.picture = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;
    await user.save();

    return user;
  }
}
