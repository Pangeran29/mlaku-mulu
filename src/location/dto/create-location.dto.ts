import { $Enums } from '@prisma/client';
import { Location } from '../entities/location.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto
  implements Omit<Location, 'id' | 'created_at' | 'updated_at'>
{
  @ApiProperty({ description: 'Name is a point in some city' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    enum: $Enums.location_type,
    description:
      'if a location is a departure then choose departing_from and if a location is destination choose destiination_to',
  })
  @IsNotEmpty()
  @IsEnum($Enums.location_type)
  type: $Enums.location_type;

  intoLocation(): Location {
    const location = new Location();
    location.name = this.name;
    location.city = this.city;
    location.address = this.address;
    location.type = this.type;
    return location;
  }
}
