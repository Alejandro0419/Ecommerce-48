import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";

import { User } from "src/entities/users.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({
    name: 'orders',
})
export class Order{
    /**
   Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   @example "UUIDdeEjemplo"
   */
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name:'user_id'})
    user: User;

    /**
   Fecha de creacion de la orden.
   @example 2024-04-30
   */
    @Column({ type: 'date', nullable: false })
    date: Date;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.order)
    orderDetails: OrderDetails
}