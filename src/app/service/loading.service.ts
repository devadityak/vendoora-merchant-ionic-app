import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(public loadingCtrl: LoadingController) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
    });

    loading.present();
  }

  dismissLoading() {
    this.loadingCtrl.dismiss();
  }
}
