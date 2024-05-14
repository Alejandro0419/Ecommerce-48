import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  /**
   Debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
   @example "Celular"
   */
  @IsOptional()
  @IsString()
  name?: string;
  /**
   Debe ser un texto y no puede ser nulo.
   @example "Pantalla resistente y duradera, alta capacidad de almacenamiento."
   */
  @IsOptional()
  @IsString()
  description?: string;
  /**
   Debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
   @example 300.99
   */
  @IsOptional()
  @IsNumber()
  price?: number;

  /**
   Debe ser un valor numérico. No puede ser nulo
   @example 20
   */
  @IsOptional()
  @IsNumber()
  stock?: number;
  /**
   Debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
   @example 'https://http.cat/images/404.jpg'
   */
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
