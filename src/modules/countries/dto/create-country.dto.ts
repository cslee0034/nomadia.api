import { Continent } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  countryName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  exchangeRate: number;

  @IsNotEmpty()
  @IsString()
  continent: Continent;
}
