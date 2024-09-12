import { PartialType } from '@nestjs/swagger';
import { CreateTouristDto } from './create-tourist.dto';
import { Tourist } from '../entities/tourist.entity';

export class UpdateTouristDto extends PartialType(CreateTouristDto) {
  intoUpdateTourist?(): Tourist {
    const tourist = new Tourist();
    tourist.name = this.name;
    tourist.phone_number = this.phone_number;
    tourist.address = this.address;
    return tourist;
  }
}
