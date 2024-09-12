import { Module } from '@nestjs/common';
import { TouristService } from './tourist.service';
import { TouristController } from './tourist.controller';
import { PrismaService } from '@app/common';

@Module({
  controllers: [TouristController],
  providers: [TouristService, PrismaService],
  exports: [TouristService],
})
export class TouristModule {}
