import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Firestore } from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ RouterModule, CabeceraComponent, CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})

export class IniciarSesionComponent {

  iniciarsesion = true;
  registro = false;

  cambioform(){
    this.iniciarsesion = !this.iniciarsesion;
    this.registro = !this.registro;
  }

  firestore = inject(Firestore);
  auth = getAuth();
  provider = new GoogleAuthProvider();

  email:string = "";
  password:string = "";
  password2:string = "";
  error:any[] = [];

  registrarse () {
    this.error = [];

    if (!this.email) {
        this.error.push('Introduce un email.');
    }

    if (!this.password) {
        this.error.push('Introduce una contraseña.');
    }

    if (this.password.length < 6) {
        this.error.push('La contraseña debe tener al menos 6 caracteres.');
    }

    if (this.password !== this.password2) {
      this.error.push('Las contraseñas no coinciden.');
    }

    if (this.error.length === 0) {
        createUserWithEmailAndPassword(this.auth, this.email, this.password)
            .then((userCredential) => {
                console.log("Registrado");
                const user = userCredential.user;
                this.email = "";
                this.password = "";
                this.password2 = "";
                // this.router.navigate(['/monedas/user.uid']);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorMessageemail = error.customData.email;


            });
    }
}

iniciarSesionEmail() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      this.email = "";
      this.password = "";

      this.router.navigate(['/monedas/user.uid']);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

  iniciarSesionGoogle() {
    console.log("hola");
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        this.router.navigate(['/mi-ruta']);

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }




  constructor(private router: Router) { 

    
  }
}
