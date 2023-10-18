import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from 'src/entities';
import { verifyPassword } from 'src/helper/password';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<User | false> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .andWhere('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();

    if (!user) {
      return false;
    }

    const isVerify = await verifyPassword(user.password, password);

    if (!isVerify) {
      return false;
    }

    return user;
  }
}
