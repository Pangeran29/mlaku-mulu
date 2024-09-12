import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaException, PrismaService } from '@app/common';
import { Tourist } from './entities/tourist.entity';

@Injectable()
export class TouristService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(tourist: Tourist): Promise<Tourist> {
    try {
      return await this.prismaService.tourist.create({ data: tourist });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAll(): Promise<Tourist[]> {
    try {
      return await this.prismaService.tourist.findMany({});
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findOne(id: number): Promise<Tourist> {
    const tourist = await this.prismaService.tourist.findUnique({
      where: { id },
    });
    if (!tourist) {
      throw new NotFoundException('Tourist not foud');
    }
    return tourist;
  }

  async findDetail(id: number) {
    const tourist = await this.prismaService.tourist.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!tourist) {
      throw new NotFoundException('Tourist not foud');
    }
    return tourist;
  }

  async update(id: number, tourist: Tourist) {
    try {
      return await this.prismaService.tourist.update({
        where: { id },
        data: tourist,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.tourist.delete({ where: { id } });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
