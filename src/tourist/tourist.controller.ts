import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TouristService } from './tourist.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Tourist Management')
@Controller('tourist')
export class TouristController {
  constructor(private readonly touristService: TouristService) {}

  @ApiOperation({
    summary: 'Crate a new tourist',
  })
  @ApiResponse({
    status: 201,
    example: {
      statusCode: 201,
      data: {
        id: 7,
        name: 'string',
        phone_number: '62888111333',
        address: 'string',
        created_at: '2024-09-12T14:29:52.866Z',
        updated_at: '2024-09-12T14:29:52.866Z',
      },
    },
  })
  @Post()
  async create(@Body() createTouristDto: CreateTouristDto) {
    let tourist = createTouristDto.intoTourist();
    tourist = await this.touristService.create(tourist);
    return tourist;
  }

  @ApiOperation({
    summary: 'Find all tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: [
        {
          id: 7,
          name: 'string',
          phone_number: '62888111333',
          address: 'string',
          created_at: '2024-09-12T14:29:52.866Z',
          updated_at: '2024-09-12T14:29:52.866Z',
        },
        {
          id: 7,
          name: 'string',
          phone_number: '62888111333',
          address: 'string',
          created_at: '2024-09-12T14:29:52.866Z',
          updated_at: '2024-09-12T14:29:52.866Z',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.touristService.findAll();
  }

  @ApiOperation({
    summary: 'Get Detail of a tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 7,
        name: 'string',
        phone_number: '62888111333',
        address: 'string',
        created_at: '2024-09-12T14:29:52.866Z',
        updated_at: '2024-09-12T14:29:52.866Z',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a tourist',
    description: 'Partial update field. Can specify the field that need update',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 7,
        name: 'string',
        phone_number: '62888111333',
        address: 'string',
        created_at: '2024-09-12T14:29:52.866Z',
        updated_at: '2024-09-12T14:29:52.866Z',
      },
    },
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTouristDto: UpdateTouristDto,
  ) {
    const tourist = updateTouristDto.intoUpdateTourist();
    return this.touristService.update(id, tourist);
  }

  @ApiOperation({
    summary: 'Delete a tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 7,
        name: 'string',
        phone_number: '62888111333',
        address: 'string',
        created_at: '2024-09-12T14:29:52.866Z',
        updated_at: '2024-09-12T14:29:52.866Z',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristService.remove(+id);
  }
}
