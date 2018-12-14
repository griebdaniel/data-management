import { Supply } from './supply';
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, Unique, PrimaryColumn, JoinColumn } from 'typeorm';
import { Product } from './product';

@Entity({ name: 'necessaries' })
// @Unique(["supply", "product"])
export class Necessary {
  @PrimaryColumn({name: 'supply_name'})
  supplyName?: number;

  @PrimaryColumn({name: 'product_name'})
  productName?: string;

  @ManyToOne(type => Supply, { eager: true })
  @JoinColumn({name: 'supply_name'})
  supply: Supply;

  @ManyToOne(type => Product)
  @JoinColumn({name: 'product_name', referencedColumnName: 'name'})
  product?: Product;

  @Column()
  quantity: number;
}
