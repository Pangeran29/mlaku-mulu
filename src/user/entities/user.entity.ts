import { user as IUser } from '@prisma/client';

export class User implements IUser {
  id: number;
  email: string;
  password: string;
  is_tourist: boolean;
  tourist_id: number;
  created_at: Date;
  updated_at: Date;
}
