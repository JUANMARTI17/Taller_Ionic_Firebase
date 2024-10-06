import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment'; // Importa el entorno

import { initializeApp } from "firebase/app";  // Importa la función para inicializar Firebase


@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor() {
    initializeApp(environment.FIREBASE_CONFIG ); // Inicializa Firebase usando environment
  }
}
