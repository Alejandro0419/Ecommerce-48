import {
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  /**
     El nombre debe ser una cadena de texto de máximo 80 caracteres y no puede ser nulo.
     @example "Jhon Doe"
     */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  /**
   * Debe ser un texto.
   * @example "Example street 123"
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  /**
   * Debe ser un número entero.
   * @example 123456789
   */
  @IsOptional()
  @IsNumber()
  phone?: number;

  /**
   * Debe ser una cadena de texto de máximo 80 caracteres.
   * @example "Peru"
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  country?: string;

  /**
   * Debe ser una cadena de texto de máximo 20 caracteres.
   * @example "Lima"
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city?: string;

  @ApiHideProperty()
  @IsEmpty()
  role?: string;
}
