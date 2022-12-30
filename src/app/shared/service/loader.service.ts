import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(check: boolean) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 200,
      cssClass: 'custom-loading',
    });
    if (check) {
      loading.present();
    }
  }
}
