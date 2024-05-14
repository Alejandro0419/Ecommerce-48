import { Order } from "src/entities/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'users',
})
export class User{
    /**
   Debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
   @example "UUIDdeEjemplo"
   */
    @PrimaryGeneratedColumn('uuid')
    id:string;

    /**
   Debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
   @example "Jhon Doe"
   */
    @Column({length:50, nullable:false})
    name: string;

   /**
   * Debe ser una cadena de texto de máximo 50 caracteres, único, tener una estructura válida según el estándar de direcciones de correo electrónico y no puede ser nulo.
   * @example useremail@example.com
   */
    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    /**
   Debe ser una cadena de texto hasheada de máximo 80 caracteres y no puede ser nulo.
   @example "$2y$10$PECeWgKwIoRUixQOk5AADOQIgqqGaQuQZ1LiZ1OP1UbrmcXU3B93S"
   */
    @Column({ length: 80, nullable: false }) //72
    password: string;

    /**
   Debe ser un número entero.
   @example 123456789
   */
    @Column({ type: 'bigint', nullable: true })
    phone: number;

    /**
   Debe ser una cadena de texto de máximo 50 caracteres.
   @example "Peru"
   */
    @Column({ length: 50, nullable: true })
    country: string;

    /**
   Debe ser un texto.
   @example "Example Street 123"
   */
    @Column({ type: 'text', nullable: true })
    address: string;

    /**
   Debe ser una cadena de texto de máximo 50 caracteres.
   @example "Lima"
   */
    @Column({ length: 50, nullable: true })
    city: string;
    
    /**
   Debe ser un valor string en user por defecto. Solo los SuperAdmin pueden gestionar los roles.
   @example 'user'
   */
    @Column({default:'user'})
    role: string;

    /**
   Relación N:N con orderDetails.
   @example ''
   */
    @OneToMany(() => Order, order => order.user)
    @JoinColumn()
    orders: Order[]; 
}