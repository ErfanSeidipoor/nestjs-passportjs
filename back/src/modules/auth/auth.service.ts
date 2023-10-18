import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { RegisterRequest } from './dto';
import { generateHashPassword } from 'src/helper/password';
import { generateUserToken } from 'src/helper/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(
    registerRequest: RegisterRequest,
  ): Promise<{ user: User; token: string }> {
    const { fullName, password, username } = registerRequest;

    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new HttpException(
        'User Already Exist With This username',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.userRepo.create({
      username,
      fullName,
      password: await generateHashPassword(password),
    });

    await newUser.save();

    return {
      user: newUser,
      token: this.jwtService.sign(generateUserToken(newUser)),
    };
  }

  async login(user: User): Promise<{ user: User; token: string }> {
    return {
      user,
      token: this.jwtService.sign(generateUserToken(user)),
    };
  }

  async profile(user: User): Promise<User> {
    return user;
  }

  async googleRedirect(user: User): Promise<User> {
    return user;
  }
}
