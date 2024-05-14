import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { Product } from 'src/entities/products.entity';


@Entity()
export class OrderDetails {
    /**
   Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   @example "UUIDdeEjemplo"
   */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
   Debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
   @example "UUIDdeEjemplo"
   */
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order, order => order.orderDetails)
    @JoinColumn({name:'order_id'})
    order: Order;

    @ManyToMany(() => Product)
    @JoinTable({
        name:'orderdetails_products',
        joinColumn: {
            name:'product_id',
            referencedColumnName:'id'
        },
        inverseJoinColumn:{
            name:'orderdetails_id',
            referencedColumnName: 'id'
        }
    })
    products: (string | Product)[];
}
