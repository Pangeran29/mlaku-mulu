import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TravelManagementService } from './travel-management.service';
import { CreateTravelManagementDto } from './dto/create-travel-management.dto';
import { UpdateTravelManagementDto } from './dto/update-travel-management.dto';
import { LocationService } from 'src/location/location.service';
import { TouristService } from 'src/tourist/tourist.service';
import { JwtAuthGuard } from '@app/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllTravelHistoryOfTouristDto } from './dto/find-all-travel-history-of-tourist.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Travel Management')
@Controller('travel-management')
export class TravelManagementController {
  constructor(
    private readonly travelManagementService: TravelManagementService,
    private readonly locationService: LocationService,
    private readonly touristService: TouristService,
  ) {}

  @ApiOperation({
    summary: 'Create a new travel for a tourist in some date',
  })
  @ApiResponse({
    status: 201,
    example: {
      statusCode: 201,
      data: {
        id: 2,
        location_from_id: 3,
        location_to_id: 4,
        travel_at: '2024-09-12T14:38:57.205Z',
        tourist_id: 5,
        created_at: '2024-09-12T14:39:33.041Z',
        updated_at: '2024-09-12T14:39:33.041Z',
      },
    },
  })
  @Post()
  async create(@Body() createTravelManagementDto: CreateTravelManagementDto) {
    {
      // validate tourist
      const { tourist_id } = createTravelManagementDto;
      await this.touristService.findOne(tourist_id);
    }

    {
      // validate location
      const { location_from_id, location_to_id } = createTravelManagementDto;
      const locationFrom = await this.locationService.findOne(location_from_id);
      if (locationFrom.type !== 'departing_from') {
        throw new BadRequestException(
          'Related location_from_id type is not departing_from',
        );
      }
      const locationTo = await this.locationService.findOne(location_to_id);
      if (locationTo.type !== 'destiination_to') {
        throw new BadRequestException(
          'Related location_to_id type is not destiination_to',
        );
      }
    }

    const travel = createTravelManagementDto.intoTraveleManagement();
    return this.travelManagementService.create(travel);
  }

  @ApiOperation({
    summary: 'Find all travel',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: [
        {
          id: 1,
          location_from_id: 3,
          location_to_id: 4,
          travel_at: '2024-09-11T10:06:55.060Z',
          tourist_id: 5,
          created_at: '2024-09-12T10:13:29.884Z',
          updated_at: '2024-09-12T10:14:02.345Z',
          tourist: {
            id: 5,
            name: 'John Doe',
            phone_number: '6282171558690',
            address: 'Jakarta',
            created_at: '2024-09-12T10:06:09.590Z',
            updated_at: '2024-09-12T10:06:09.590Z',
          },
          history_location_from: {
            id: 3,
            name: 'Buah Batu',
            city: 'Bandung',
            address:
              'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
            type: 'departing_from',
            created_at: '2024-09-12T10:02:52.344Z',
            updated_at: '2024-09-12T10:02:52.344Z',
          },
          history_location_to: {
            id: 4,
            name: 'Jatiwaringin',
            city: 'Bekasi',
            address:
              'JL RAYA JATIWARINGIN NO5J, DEKAT UNIVASSAFIAHRT007RW9, JATICEMPAKA, KEC PONDOKGEDE, KOTA BKS, JAWA BARAT 17411',
            type: 'destiination_to',
            created_at: '2024-09-12T10:03:54.550Z',
            updated_at: '2024-09-12T10:03:54.550Z',
          },
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.travelManagementService.findAll();
  }

  @ApiOperation({
    summary: 'Get detail travel of a tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 2,
        location_from_id: 3,
        location_to_id: 4,
        travel_at: '2024-09-12T14:38:57.205Z',
        tourist_id: 5,
        created_at: '2024-09-12T14:39:33.041Z',
        updated_at: '2024-09-12T14:39:33.041Z',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelManagementService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update travel data of a tourist',
    description: 'Partial update field. Can specify the field that need update',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 2,
        location_from_id: 3,
        location_to_id: 4,
        travel_at: '2024-09-12T14:38:57.205Z',
        tourist_id: 5,
        created_at: '2024-09-12T14:39:33.041Z',
        updated_at: '2024-09-12T14:39:33.041Z',
      },
    },
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTravelManagementDto: UpdateTravelManagementDto,
  ) {
    {
      await this.travelManagementService.findOne(id);
    }

    {
      // validate tourist
      const { tourist_id } = updateTravelManagementDto;
      await this.touristService.findOne(tourist_id);
    }

    {
      // validate location
      if (updateTravelManagementDto?.location_from_id) {
        const { location_from_id } = updateTravelManagementDto;
        const locationFrom =
          await this.locationService.findOne(location_from_id);
        if (locationFrom.type !== 'departing_from') {
          throw new BadRequestException(
            'Related location_from_id type is not departing_from',
          );
        }
      }

      if (updateTravelManagementDto?.location_to_id) {
        const { location_to_id } = updateTravelManagementDto;
        const locationTo = await this.locationService.findOne(location_to_id);
        if (locationTo.type !== 'destiination_to') {
          throw new BadRequestException(
            'Related location_to_id type is not destiination_to',
          );
        }
      }
    }

    const travel = updateTravelManagementDto.intoUpdateTraveleManagement();
    return this.travelManagementService.update(id, travel);
  }

  @ApiOperation({
    summary: 'Delete a travel of a tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: {
        id: 2,
        location_from_id: 3,
        location_to_id: 4,
        travel_at: '2024-09-12T14:38:57.205Z',
        tourist_id: 5,
        created_at: '2024-09-12T14:39:33.041Z',
        updated_at: '2024-09-12T14:39:33.041Z',
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    {
      await this.travelManagementService.findOne(id);
    }

    return this.travelManagementService.remove(+id);
  }

  @ApiOperation({
    summary: 'Find all travel history for a tourist',
  })
  @ApiResponse({
    status: 200,
    example: {
      statusCode: 200,
      data: [
        {
          id: 1,
          location_from_id: 3,
          location_to_id: 4,
          travel_at: '2024-09-11T10:06:55.060Z',
          tourist_id: 5,
          created_at: '2024-09-12T10:13:29.884Z',
          updated_at: '2024-09-12T10:14:02.345Z',
          tourist: {
            id: 5,
            name: 'John Doe',
            phone_number: '6282171558690',
            address: 'Jakarta',
            created_at: '2024-09-12T10:06:09.590Z',
            updated_at: '2024-09-12T10:06:09.590Z',
          },
          history_location_from: {
            id: 3,
            name: 'Buah Batu',
            city: 'Bandung',
            address:
              'JL SOEKARNO-HATTA NO482, BATUNUNGGAL, KEC BANDUNG KIDUL, KOTA BANDUNG, JAWA BARAT 40266',
            type: 'departing_from',
            created_at: '2024-09-12T10:02:52.344Z',
            updated_at: '2024-09-12T10:02:52.344Z',
          },
          history_location_to: {
            id: 4,
            name: 'Jatiwaringin',
            city: 'Bekasi',
            address:
              'JL RAYA JATIWARINGIN NO5J, DEKAT UNIVASSAFIAHRT007RW9, JATICEMPAKA, KEC PONDOKGEDE, KOTA BKS, JAWA BARAT 17411',
            type: 'destiination_to',
            created_at: '2024-09-12T10:03:54.550Z',
            updated_at: '2024-09-12T10:03:54.550Z',
          },
        },
      ],
    },
  })
  @Get('tourist/:tourist_id/history')
  findTravelHistoryForATourist(
    @Param('tourist_id') tourist_id: number,
    @Query() findAllTravelHistoryOfTouristDto: FindAllTravelHistoryOfTouristDto,
  ) {
    return this.travelManagementService.findAllHistoryOfTourist(
      tourist_id,
      findAllTravelHistoryOfTouristDto,
    );
  }
}
