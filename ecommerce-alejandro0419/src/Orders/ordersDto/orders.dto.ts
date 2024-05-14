import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  /**
   * Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   * @example uuid
   */
  @ApiProperty({
    description: `Debe ser un valor válido generado aquímente en formato UUID. No puede ser nulo y actívamente como la clave primaria de la entidad.`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Es un arreglo de objetos que contienen el identificador de cada producto.
   * @example [{id: 1}, {id: 2}]
   */
    @ApiProperty({
    description: `Es un arreglo de objetos que contienen el identificador de cada producto.`,
    example: [{id: 'uuid1'}, {id: 'uuid2'}],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  products: Partial<Product[]>;
}
