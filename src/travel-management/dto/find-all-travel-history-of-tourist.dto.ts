import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPositive } from 'class-validator';

export class FindAllTravelHistoryOfTouristDto {
  @ApiProperty({ description: 'start date for select range of history' })
  @IsDate()
  @IsOptional()
  start_preriod?: Date;

  @ApiProperty({ description: 'end date for select range of history' })
  @IsDate()
  @IsOptional()
  end_preriod?: Date;

  @ApiProperty({
    description:
      'Fill with id of desired destination that come from /location api',
  })
  @IsPositive()
  @IsOptional()
  location_destination_id?: number;
}
