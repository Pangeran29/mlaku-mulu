import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaException, PrismaService } from '@app/common';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(location: Location) {
    try {
      return await this.prismaService.location.create({ data: location });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.location.findMany();
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findOne(id: number) {
    const location = await this.prismaService.location.findUnique({
      where: { id },
    });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: number, location: Location) {
    try {
      return await this.prismaService.location.update({
        where: { id },
        data: location,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.location.delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
