import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppmanagerService } from '../appmanager.service';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Item[];

  constructor(
    private appManagerService: AppmanagerService,
    private alertController: AlertController
  ) {
    this.items = appManagerService.getItems();
  }

  handleKeypad(text: string): void {
    this.appManagerService.updateQuantity(text);
  }

  handleItem(itm: Item): void {
    this.appManagerService.selectedItem = itm;
  }

  async handleOrderAdd(): Promise<void> {
    if (this.appManagerService.addOrder()) {
      const alert = await this.alertController.create({
        header: 'Success!!',
        // eslint-disable-next-line max-len
        message:
          'Your have bought ' +
          this.appManagerService.quantity +
          ' ' +
          this.appManagerService.selectedItem.name +
          ' and the total is ' + this.appManagerService.quantity*this.appManagerService.selectedItem.price +
          ' CND',
        buttons: ['OK'],
      });

      await alert.present();
      await alert.onDidDismiss();

      this.appManagerService.resetCurrentOrder();
      // console.log(this.appManagerService.transaction);

    } else {
      const alert = await this.alertController.create({
        header: 'Warning!!',
        message: 'Make sure you selected less quantity then whats in stock.',
        buttons: ['OK'],
      });

      await alert.present();
      await alert.onDidDismiss();

      this.appManagerService.resetCurrentOrder();
    }
  }
}
