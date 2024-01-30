import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Firestore } from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ RouterModule, CabeceraComponent, CommonModule, FormsModule, CanvasJSAngularChartsModule],
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
  GithubProvider = new GithubAuthProvider();
  providerFacebook = new FacebookAuthProvider();
  errorPorCorreoExisitente:string = "";

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
        this.router.navigate(['/']);

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  iniciarConFaceBook() {
    signInWithPopup(this.auth, this.providerFacebook)
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
  
    const user = result.user;
      console.log(user.displayName);
      this.router.navigate(['/']);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });
  
  }

  iniciarConGithub() {
    console.log("iniciarConGithub");
      signInWithPopup(this.auth, this.GithubProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
        this.router.navigate(['/']);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
    console.log(errorCode);
    if (errorCode === 'auth/account-exists-with-different-credential') {
    this.errorPorCorreoExisitente = 'Ya existe un usuario con la misma dirección de correo electrónico pero con diferentes credenciales de inicio de sesión.';
    }
      // ...
    });
  }


  constructor(private router: Router) { 

    
  }
}
