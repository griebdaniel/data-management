import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Supply } from './supply';
import { Necessary } from './necessary';

@Entity({ name: 'products' })
export class Product {
    @PrimaryColumn()
    name: string;

    @OneToMany(type => Necessary, necessary => necessary.product, { eager: true, cascade: [ 'insert', 'remove', 'update' ] })
    necessary: Necessary[];
}
