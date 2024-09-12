import { $Enums, location } from '@prisma/client';

export class Location implements location {
  id: number;
  name: string;
  city: string;
  address: string;
  type: $Enums.location_type;
  created_at: Date;
  updated_at: Date;
}
