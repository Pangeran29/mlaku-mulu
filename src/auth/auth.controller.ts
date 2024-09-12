import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CurrentUser, GetCurrentUser, JwtAuthGuard } from '@app/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'Register an account',
  })
  @ApiResponse({
    status: 201,
    example: {
      statusCode: 201,
      data: {
        id: 3,
        email: 'string',
        password:
          '$2b$10$y3AnYU463Mr/sLZR4.R0geb63X0CPiw.twuQPd3CC90/a2f17Pqy6',
        is_tourist: false,
        tourist_id: null,
        created_at: '2024-09-11T09:47:32.217Z',
        updated_at: '2024-09-11T09:47:32.217Z',
      },
    },
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    {
      const user = await this.userService.findByEmail(registerDto.email);
      if (user) {
        throw new BadRequestException('User already registered');
      }
    }
    const hashedPassword = await this.authService.hash(registerDto.password);
    registerDto.setPassword(hashedPassword);
    const user = registerDto.intoUser();
    return await this.userService.create(user);
  }

  @ApiOperation({
    summary: 'Login to an account',
    description: `Example account { "email": "johndoe@gmail.com", "password": "John@123" }`,
  })
  @ApiResponse({
    status: 201,
    example: {
      statusCode: 201,
      data: {
        user: {
          id: 1,
          email: 'string',
          password:
            '$2b$10$Hiueuzzh0SajhOUg8MqvbO7rdNJzuS/rMvNqs7nV2IRBX7.F8dF/O',
          is_tourist: false,
          tourist_id: null,
          created_at: '2024-09-11T09:29:53.457Z',
          updated_at: '2024-09-11T09:29:53.457Z',
        },
        token: {
          type: 'bearer',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcyNjA0ODEzMCwiZXhwIjoxNzI2MDUxNzMwfQ.zww-rFQb7bwpnCYmFSeGkdZJDtr5dnmD3x1MTWtYjIs',
        },
      },
    },
  })
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('User is not registered');
    }

    const validatePassword = await this.authService.compareHashed(
      loginDto.password,
      user.password,
    );
    if (!validatePassword) {
      throw new BadRequestException('User password is not valid');
    }

    const token = await this.authService.getAccessToken(user.id);
    return { user, token };
  }

  @ApiOperation({
    summary: 'Get current logged in user data based on provided access token',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 1,
        email: 'string',
        password:
          '$2b$10$Hiueuzzh0SajhOUg8MqvbO7rdNJzuS/rMvNqs7nV2IRBX7.F8dF/O',
        is_tourist: false,
        tourist_id: null,
        created_at: '2024-09-11T09:29:53.457Z',
        updated_at: '2024-09-11T09:29:53.457Z',
      },
    },
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@GetCurrentUser() currentUser: CurrentUser) {
    const user = await this.userService.findById(currentUser.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
