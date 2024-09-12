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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Location Management')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({
    summary:
      'Create a single location where either it destination or deprature',
    description:
      'Name is the location point in some city, example Buah batu in Bandung city',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 201,
      data: {
        id: 6,
        name: 'Buah Batu',
        city: 'Bandung',
        address:
          'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
        type: 'departing_from',
        created_at: '2024-09-12T14:13:41.718Z',
        updated_at: '2024-09-12T14:13:41.718Z',
      },
    },
  })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    const location = createLocationDto.intoLocation();
    return this.locationService.create(location);
  }

  @ApiOperation({
    summary: 'Get list of location',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: [
        {
          id: 3,
          name: 'Buah Batu',
          city: 'Bandung',
          address:
            'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
          type: 'departing_from',
          created_at: '2024-09-12T10:02:52.344Z',
          updated_at: '2024-09-12T10:02:52.344Z',
        },
        {
          id: 4,
          name: 'Jatiwaringin',
          city: 'Bekasi',
          address:
            'JL RAYA JATIWARINGIN NO5J, DEKAT UNIVASSAFIAHRT007RW9, JATICEMPAKA, KEC PONDOKGEDE, KOTA BKS, JAWA BARAT 17411',
          type: 'destiination_to',
          created_at: '2024-09-12T10:03:54.550Z',
          updated_at: '2024-09-12T10:03:54.550Z',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({
    summary: 'Get detail of a location',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 6,
        name: 'Buah Batu',
        city: 'Bandung',
        address:
          'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
        type: 'departing_from',
        created_at: '2024-09-12T14:13:41.718Z',
        updated_at: '2024-09-12T14:13:41.718Z',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.locationService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Get detail of a location',
    description: 'Partial update field. Can specify the field that need update',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 6,
        name: 'Buah Batu',
        city: 'Bandung',
        address:
          'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
        type: 'departing_from',
        created_at: '2024-09-12T14:13:41.718Z',
        updated_at: '2024-09-12T14:13:41.718Z',
      },
    },
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    {
      await this.locationService.findOne(id);
    }

    const location = updateLocationDto.intoUpdateLocation();
    return this.locationService.update(+id, location);
  }

  @ApiOperation({
    summary: 'Delete a location',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 6,
        name: 'Buah Batu',
        city: 'Bandung',
        address:
          'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
        type: 'departing_from',
        created_at: '2024-09-12T14:13:41.718Z',
        updated_at: '2024-09-12T14:13:41.718Z',
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    {
      await this.locationService.findOne(id);
    }

    return this.locationService.remove(+id);
  }
}
