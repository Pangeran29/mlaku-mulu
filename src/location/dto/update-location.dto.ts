import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { Location } from '../entities/location.entity';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  intoUpdateLocation(): Location {
    const location = new Location();
    location.name = this.name;
    location.city = this.city;
    location.address = this.address;
    location.type = this.type;
    return location;
  }
}
