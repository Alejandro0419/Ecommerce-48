import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  /**
   Debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
   @example "Teclado Rize"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   Debe ser un texto y no puede ser nulo.
   @example "El mejor teclado del mercado."
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   Debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
   @example 300.99
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   Debe ser un valor numérico. No puede ser nulo
   @example 30
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   * Debe ser una cadena de texto. No debe ser nulo
   * @example 'keyboard'
   */
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  /**
   Debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
   @example 'https://http.cat/images/404.jpg'
   */
  @IsOptional()
  @IsString()
  imgUrl: string;

}
