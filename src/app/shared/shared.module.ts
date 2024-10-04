import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storages/storage.service';
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './controllers/loading/loading.service';

const COMPONENTS = [InputComponent, ButtonComponent, AvatarComponent];
const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule];

 const PROVIDERS = [StorageService, AuthService];

const CONTROLLERS = [LoadingService];
@NgModule({
  declarations: [... COMPONENTS],
  imports: [
    ...MODULES
  ],
  providers: [...PROVIDERS, ...CONTROLLERS],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule { }
