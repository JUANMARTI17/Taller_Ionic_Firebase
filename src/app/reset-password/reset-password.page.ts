import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public email!: FormControl;
  public resetForm!: FormGroup;

  constructor(
    private readonly authSrv: AuthService,
    private readonly loadingSrv: LoadingService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.resetForm = new FormGroup({
      email: this.email,
    });
  }

  
}
