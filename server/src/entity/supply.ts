import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'supplies' })
export class Supply {
    @PrimaryColumn()
    name: string;
}
