import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/app/shared/services/storages/storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public Image!: FormControl;
public Name!: FormControl;
public Lastname!: FormControl;
public Age!: FormControl;
public Email!: FormControl;
public Phone!: FormControl;
public Password!: FormControl;
public registerForm!: FormGroup;
public PasswordType: 'text' | 'Password' = 'Password';

  constructor(private readonly authsrv: AuthService, private readonly loadsrv: LoadingService, private readonly navctr: NavController, private readonly firest: AngularFirestore, private readonly storaService: StorageService, private readonly toaMsj: ToastService) {
  this.initFrom();

   }

  ngOnInit() {
  }

public async doRegister(){
  try {
    await this.loadsrv.show();
    console.log(this.registerForm.value);
    const {Email, Password, Image} = this.registerForm.value;
    const userCreden: any = await this.authsrv.register(Email, Password);
      const userId = userCreden.user?.uid;
      if (!userId) {
        throw new Error('Error al obtener el Id del usuario.');
      }

      let ImageUrl = "";
      if (Image) {
        ImageUrl = await this.storaService.uploadFileAndGetUrl(Image);
      } else {
        console.warn('Imagen no seleccionada por el usuario registrado');
      }

      await this.regisUsers(userId, Email, ImageUrl);
      this.toaMsj.mentoast('Registro Exitoso, puede ir a loguearse.', 'success');
      await this.loadsrv.dismiss();
      this.navctr.navigateForward("/login");
    }  catch (error) {
      await this.loadsrv.dismiss();

      if (error instanceof Error) {
        if (error.message.includes('email already in use')) {
          this.toaMsj.mentoast('El correo ya está en uso.', 'danger');
        } else {
          this.toaMsj.mentoast('Error al registrarse: ' + error.message, 'danger');
        }
      } else {
        this.toaMsj.mentoast('Error desconocido al registrarse.', 'danger');
      }
      console.error('Error al registrarse:', error);
    }
    }
    public togglePassword(){
      this.PasswordType = this.PasswordType === 'Password' ? 'text' : 'Password';
    }



  private initFrom(){
    this.Image= new FormControl("");
    this.Name= new FormControl("", [Validators.required]);
    this.Lastname= new FormControl("", [Validators.required]);
    this.Age= new FormControl("",[Validators.required]);
    this.Email= new FormControl("", [Validators.required, Validators.email]);
    this.Phone= new FormControl("", [Validators.required]);
    this.Password= new FormControl("", [Validators.required]);
    this.registerForm= new FormGroup({

      Image: this.Image,
      Name: this.Name,
      Lastname: this.Lastname,
      Age: this.Age,
      Email: this.Email,
      Phone: this.Phone,
      Password: this.Password

    });



  }
  private async regisUsers(userId: string, Email: string, imageFile: string) {
    try {
      await this.firest.collection('users').doc(userId).set({
        Email,
        Image: imageFile,
        Name: this.registerForm.get('Name')?.value,
        Lastname: this.registerForm.get('Lastname')?.value,
        Age: this.registerForm.get('Age')?.value,
        Phone: this.registerForm.get('Phone')?.value,
      });
      console.log('User registrado en Firestore');
    } catch (error) {
      console.error('Error al registrar al user en Firestore:', error);
      throw error;
    }

}
}
