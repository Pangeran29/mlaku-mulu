import { PartialType } from '@nestjs/swagger';
import { CreateTravelManagementDto } from './create-travel-management.dto';
import { TravelManagement } from '../entities/travel-management.entity';

export class UpdateTravelManagementDto extends PartialType(
  CreateTravelManagementDto,
) {
  intoUpdateTraveleManagement(): TravelManagement {
    const travel = new TravelManagement();
    travel.location_from_id = this.location_from_id;
    travel.location_to_id = this.location_to_id;
    travel.travel_at = this.travel_at;
    travel.tourist_id = this.tourist_id;
    return travel;
  }
}
