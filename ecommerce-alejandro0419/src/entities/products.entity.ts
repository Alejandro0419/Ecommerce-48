import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Entity({
  name: 'products',
})
export class Product {
  /**
   Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   @example "UUIDdeEjemplo"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   Debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
   @example "Celular"
   */
  @Column({ length: 50, nullable: false, unique: true, type: 'varchar' })
  name: string;

  /**
   Debe ser un texto y no puede ser nulo.
   @example "Pantalla resistente y duradera, alta capacidad de almacenamiento."
   */
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   Debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
   @example 300.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   Debe ser un valor numérico. No puede ser nulo
   @example 54
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   Debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
   @example 'https://http.cat/images/404.jpg'
   */
  @Column({ type: 'varchar', default: 'https://http.cat/images/404.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetails)
  orderDetails: OrderDetails[];
}
