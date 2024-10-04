import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public Image!: FormControl;
public Name!: FormControl;
public Lastname!: FormControl;
public Email!: FormControl;
public Password!: FormControl;
public registerForm!: FormGroup;
  constructor(private readonly authsrv: AuthService, private readonly loadsrv: LoadingService ) {
  this.initFrom();

   }

  ngOnInit() {
  }

public async doRegister(){
  try {
    await this.loadsrv.show();
    console.log(this.registerForm.value);
    const {Email, Password} = this.registerForm.value
    const response = await this.authsrv.register(Email, Password);
    console.log( "~ RegisterPage ~ doRegister ~ response:", response);
    await this.loadsrv.dismiss();


  } catch (error) {
    await this.loadsrv.dismiss();

    console.error(error);
  }
}


  private initFrom(){
    this.Image= new FormControl("");
    this.Name= new FormControl("", [Validators.required]);
    this.Lastname= new FormControl("", [Validators.required]);
    this.Email= new FormControl("", [Validators.required, Validators.email]);
    this.Password= new FormControl("", [Validators.required]);
    this.registerForm= new FormGroup({

      Image: this.Image,
      Name: this.Name,
      Lastname: this.Lastname,
      Email: this.Email,
      Password: this.Password

    });


  }

}
