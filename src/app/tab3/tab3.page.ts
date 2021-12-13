import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppmanagerService } from '../appmanager.service';
import { Item } from 'src/app/model/item';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  items: Item[];
  itmStock: Stock[];
  reStock: number;

  constructor(
    private appManagerService: AppmanagerService,
    private alertController: AlertController
  ) {
    this.items = appManagerService.item;
    this.itmStock = appManagerService.itmStock;
    this.reStock = 5;
  }

  ngOnInit() {}

  substract(itm: string, stock: number): void {
    this.itmStock.find((o, i) => {
      if (o.name === itm) {
        if (this.itmStock[i].stock > 0) {
          this.itmStock[i].stock--;
        }
        return true;
      }
    });
  }

  add(itm: string, stock: number): void {
    this.itmStock.find((o, i) => {
      if (o.name === itm) {
        if (this.itmStock[i].stock < 100) {
          this.itmStock[i].stock++;
        }
        return true;
      }
    });
  }

  async stock(itm: string, stock: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Success!!',
      // eslint-disable-next-line max-len
      message:
        'Your have restocked ' +
        stock +
        ' ' +
        itm +
        ' to your store.',
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();

    this.appManagerService.restock(itm, stock);
    this.appManagerService.resetItemStock(itm, stock);
  }
}
