import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @IsStrongPassword({
    minLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
