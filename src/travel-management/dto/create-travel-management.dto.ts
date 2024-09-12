import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { TravelManagement } from '../entities/travel-management.entity';

export class CreateTravelManagementDto
  implements Omit<TravelManagement, 'id' | 'created_at' | 'updated_at'>
{
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  location_from_id: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  location_to_id: number;

  @IsNotEmpty()
  @IsDate()
  travel_at: Date;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  tourist_id: number;

  intoTraveleManagement(): TravelManagement {
    const travel = new TravelManagement();
    travel.location_from_id = this.location_from_id;
    travel.location_to_id = this.location_to_id;
    travel.travel_at = this.travel_at;
    travel.tourist_id = this.tourist_id;
    return travel;
  }
}
