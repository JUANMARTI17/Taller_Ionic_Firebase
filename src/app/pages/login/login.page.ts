import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!:FormGroup;
  public errorMessage: string | null = null;

  constructor(private readonly authSrv: AuthService, private readonly navCtrl: NavController,
    private readonly loadingSrv: LoadingService) { 
    this.initForm();
  }

  ngOnInit() {
  }

  public async doLogin() {
    try {
      await this.loadingSrv.show();
      const { email, password} = this.loginForm.value;
      await this.authSrv.login(email, password);
      this.navCtrl.navigateForward("home")
      await this.loadingSrv.dismiss()
    } catch (error) {
      console.error(error);
      this.errorMessage = "Invalid credentials, please try again";
      await this.loadingSrv.dismiss();
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required,
      Validators.email]);
      this.password = new FormControl('', [Validators.required]);
      this.loginForm = new FormGroup ({
        email: this.email,
        password: this.password
      });
  }

}
