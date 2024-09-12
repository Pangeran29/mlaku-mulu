import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('0. Std API Response')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Standard Response',
    description:
      'Standart format for success and error response</br>All field are well descripted in schema, please kindly read that',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: 'Hello World!',
    },
  })
  @ApiResponse({
    status: 201,
    example: {
      statusCode: 201,
      data: 'Hello World!',
    },
  })
  @ApiResponse({
    status: 400,
    example: {
      statusCode: 400,
      error: {
        message: 'Invalid input',
        detailError: [
          {
            property: 'password',
            message: 'password is not strong enough',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      statusCode: 404,
      error: {
        message: 'User not found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    example: {
      statusCode: 500,
      error: {
        message: 'Fail to do DB operation',
        detailError:
          "\nInvalid `this.prismaService.user.findFirst()` invocation in\n/home/jojojow/my/project/mlaku-mulu-be/dist/main.js:1238:50\n\n  1235 }\n  1236 async findByUsername(username) {\n  1237     try {\n→ 1238         return await this.prismaService.user.findFirst(\nCan't reach database server at `localhost:5431`\n\nPlease make sure your database server is running at `localhost:5431`.",
      },
    },
  })
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
