import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { Firestore } from '@angular/fire/firestore';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [ RouterModule, CabeceraComponent, CommonModule, RouterModule ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})


export class CabeceraComponent implements OnInit{

  auth = getAuth();
  user = this.auth.currentUser;
  uid = this.user?.uid;
  ngOnInit(): void {
    console.log(this.uid);
  }

  firestore = inject(Firestore);

  constructor(private router: Router) { }



  cerrarSesion() {
    signOut(this.auth).then(() => {
      this.user = null;
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  // mostrarMonedas(uid) {
  //   console.log(uid);
  // }


  mostrarCryptos(uid: any) {
    this.uid = uid;
    console.log(this.uid);
    this.router.navigate(['/monedas', this.uid]);
  }

  nav = document.querySelector('.right-header nav');
  toggleMenu() {
    if (this.nav == null) {
      return;
    }
    this.nav.classList.toggle('open');
  }


}
