import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private readonly loadingctrl: LoadingController ) { }

  public async show(){
    const loading = await this.loadingctrl.create({});

await loading.present();

  }
  public async dismiss(){

  await this.loadingctrl.dismiss();

  }

}
