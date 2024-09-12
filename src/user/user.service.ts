import { PrismaException, PrismaService } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      return await this.prismaService.user.create({ data: user });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(user: User): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id: user.id },
        data: user,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findDetail(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
        include: { related_tourist: true },
      });

      if (!user) {
        throw new BadRequestException('User is not registered');
      }

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
