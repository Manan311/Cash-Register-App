import { Item } from './item';

export class ItemTransaction {
    item: Item;
    cnt: number;

    constructor(itm: Item, c: number) {
        this.item = itm;
        this.cnt = c;
    }

    get price(): number {
        return parseInt((this.cnt*this.item.price).toFixed(2), 10);
    }
}
