import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';
import { ApiHideProperty, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   El nombre debe ser una cadena de texto de máximo 80 caracteres y no puede ser nulo.
   @example "Usuario Ejemplo"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser una cadena de texto de máximo 50 caracteres, único, tener una estructura válida según el estándar de direcciones de correo electrónico y no puede ser nulo.
   * @example useremail@example.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
   * @example aA1!23456
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
  )
  password: string;

  /**
   * Debe coincidir con la propiedad password.
   * @example aA1!23456
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un texto.
   * @example "Example street 123"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número entero. 
   * @example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser una cadena de texto de máximo 80 caracteres.
   * @example "Peru"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  country: string;

  /**
   * Debe ser una cadena de texto de máximo 20 caracteres.
   * @example "Lima"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
