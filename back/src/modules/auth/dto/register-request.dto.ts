import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(40)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  fullName: string;
}
