import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Tourist } from '../entities/tourist.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTouristDto
  implements Omit<Tourist, 'id' | 'created_at' | 'updated_at'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Provide a valid phone number that start with 0 or country code',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('ID', { message: 'Must be a valid phone number' })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  intoTourist(): Tourist {
    const tourist = new Tourist();
    tourist.name = this.name;
    tourist.phone_number = this.phone_number;
    tourist.address = this.address;
    return tourist;
  }
}
