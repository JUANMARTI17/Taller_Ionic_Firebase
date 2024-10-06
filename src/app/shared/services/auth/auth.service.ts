import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import Firebase para manejar las funcionalidades de recuperación de contraseña

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly fireauth: AngularFireAuth) {}

  public register(Email: string, Password: string) {
    return new Promise((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(Email, Password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  
}
