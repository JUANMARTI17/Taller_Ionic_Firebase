import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly tstmsg: ToastController) { }

  async mentoast(message: string, color: string = 'success'){
    const toa = await this.tstmsg.create({
      message,
      duration: 2000,
      color,
      position: 'top',

    });

    toa.present();

  }
}
