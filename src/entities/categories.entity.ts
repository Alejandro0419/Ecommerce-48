import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products.entity";

@Entity({
    name: 'categories'
})
export class Category{
    /**
   Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   @example "UUIDdeEjemplo"
   */
    @PrimaryGeneratedColumn('uuid')
    id:string;

    /**
   Debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
   @example "UUIDdeEjemplo"
   */
    @Column({length:50, nullable: false})
    name:string;
    
    @OneToMany(()=> Product, product => product.category)
    @JoinColumn()
    products: Product[];
}