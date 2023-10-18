import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/entities';
import { EnvironmentVariableTypeEnum } from 'src/enums';
import { IToken } from 'src/helper/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(EnvironmentVariableTypeEnum.JWT_SECRET),
    });
  }

  async validate(input: IToken): Promise<User | false> {
    const user = await this.userRepo.findOne({
      where: {
        id: input.id,
      },
    });

    if (!user) {
      return false;
    }

    return user;
  }
}
