import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class RegisterDto {
  @IsString()
  email: string;

  @ApiProperty({
    description:
      'Use strong password with with combination of letter, number, and special character with minimum length of 8',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  intoUser(): User {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    return user;
  }

  setPassword(password: string): string {
    this.password = password;
    return password;
  }
}
