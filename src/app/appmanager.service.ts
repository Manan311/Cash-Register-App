import { Injectable } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemTransaction } from 'src/app/model/itemTransaction';
import { Transaction } from 'src/app/model/transaction';
import { Stock } from 'src/app/model/stock';

@Injectable({
  providedIn: 'root',
})
export class AppmanagerService {
  quantity: number;
  item: Item[];
  selectedItem: Item;
  transaction: Transaction[];
  itmStock: Stock[];

  constructor() {
    this.quantity = 0;
    this.selectedItem = null;

    this.transaction = [];

    this.item = [
      { name: 'Pants', price: 50.7, stock: 25 },
      { name: 'Shoes', price: 90, stock: 50 },
      { name: 'Hats', price: 20.5, stock: 10 },
      { name: 'Shirt', price: 40.3, stock: 25 },
    ];

    this.itmStock = [
      { name: this.item[0].name, stock: 0 },
      { name: this.item[1].name, stock: 0 },
      { name: this.item[2].name, stock: 0 },
      { name: this.item[3].name, stock: 0 },
    ];
  }

  updateQuantity(text: string): void {
    this.quantity = parseInt(this.quantity.toString() + text, 10);
  }

  resetQuantity(): void {
    this.quantity = 0;
  }

  getItems(): Item[] {
    return [...this.item];
  }

  addOrder(): boolean {
    if (
      this.quantity !== 0 &&
      this.quantity <= this.selectedItem.stock &&
      this.selectedItem != null
    ) {
      this.selectedItem.stock -= this.quantity;

      const itemTransaction: Transaction = {
        name: this.selectedItem.name,
        price: this.selectedItem.price*this.quantity,
        quantity: this.quantity * -1,
        transtime: new Date(),
      };

      this.transaction.push(itemTransaction);

      return true;
    } else {
      return false;
    }
  }

  resetCurrentOrder(): void {
    this.quantity = 0;
    this.selectedItem = null;
  }

  restock(itm: string, stock: number): void {
    let p = 0;
    let q = 0;
    this.item.find((o, i) => {
      if (o.name === itm) {
        this.item[i].stock += stock;
        p = this.item[i].price;
        q = this.item[i].stock;
        return true;
      }
    });

    const itemTransaction: Transaction = {
      name: itm,
      price: p*stock,
      quantity: stock,
      transtime: new Date(),
    };

    this.transaction.push(itemTransaction);
  }

  resetItemStock(itm: string, stock: number): void {
    this.itmStock.find((o, i) => {
      if (o.name === itm) {
        this.itmStock[i].stock = 0;
        return true;
      }
    });
  }
}
