import { history } from '@prisma/client';

export class TravelManagement implements history {
  id: number;
  location_from_id: number;
  location_to_id: number;
  travel_at: Date;
  tourist_id: number;
  created_at: Date;
  updated_at: Date;
}
