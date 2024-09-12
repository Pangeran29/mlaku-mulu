import { tourist } from '@prisma/client';

export class Tourist implements tourist {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}
