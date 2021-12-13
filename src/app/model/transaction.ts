import { Item } from './item';

export interface Transaction {
    name: string;
    price: number;
    quantity: number;
    transtime: Date;
}
