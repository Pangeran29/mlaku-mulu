import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaService } from '@app/common';

@Module({
  controllers: [LocationController],
  providers: [LocationService, PrismaService],
  exports: [LocationService],
})
export class LocationModule {}
