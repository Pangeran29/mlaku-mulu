import { Module } from '@nestjs/common';
import { TravelManagementService } from './travel-management.service';
import { TravelManagementController } from './travel-management.controller';
import { LocationModule } from 'src/location/location.module';
import { TouristModule } from 'src/tourist/tourist.module';
import { PrismaService } from '@app/common';

@Module({
  controllers: [TravelManagementController],
  providers: [TravelManagementService, PrismaService],
  imports: [LocationModule, TouristModule],
})
export class TravelManagementModule {}
