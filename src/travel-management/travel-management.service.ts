import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaException, PrismaService } from '@app/common';
import { TravelManagement } from './entities/travel-management.entity';
import { FindAllTravelHistoryOfTouristDto } from './dto/find-all-travel-history-of-tourist.dto';

@Injectable()
export class TravelManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(travelManagement: TravelManagement) {
    try {
      return await this.prismaService.history.create({
        data: travelManagement,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.history.findMany({
        include: {
          tourist: true,
          history_location_from: true,
          history_location_to: true,
        },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAllHistoryOfTourist(
    touristId: number,
    findAllTravelHistoryOfTouristDto: FindAllTravelHistoryOfTouristDto,
  ) {
    try {
      return await this.prismaService.history.findMany({
        where: {
          tourist_id: touristId,
          travel_at: {
            gte: findAllTravelHistoryOfTouristDto?.start_preriod,
            lte: findAllTravelHistoryOfTouristDto.end_preriod,
          },
          location_to_id:
            findAllTravelHistoryOfTouristDto.location_destination_id,
        },
        include: {
          tourist: true,
          history_location_from: true,
          history_location_to: true,
        },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findOne(id: number) {
    try {
      const travel = await this.prismaService.history.findUnique({
        where: { id },
      });
      if (!travel) {
        throw new NotFoundException('Travel not found');
      }
      return travel;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(id: number, travelManagement: TravelManagement) {
    try {
      return await this.prismaService.history.update({
        where: { id },
        data: travelManagement,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.history.delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
