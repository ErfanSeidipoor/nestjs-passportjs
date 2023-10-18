import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from 'src/entities';
import { RegisterRequest } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<{ user: User; token: string }> {
    return this.authService.register(registerRequest);
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async data(@Req() request: Request) {
    const user = request.user;
    return this.authService.profile(user);
  }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {}

  @Get('/login/google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogleCallback(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { token } = await this.authService.login(request.user);
    response.cookie('token', token);
    response.redirect('http://localhost:3000');
  }

  @Get('/login/discord')
  @UseGuards(AuthGuard('discord'))
  async loginDiscord() {}

  @Get('/login/discord/callback')
  @UseGuards(AuthGuard('discord'))
  async loginDiscordCallback(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { token } = await this.authService.login(request.user);
    response.cookie('token', token);
    response.redirect('http://localhost:3000');
  }
}
