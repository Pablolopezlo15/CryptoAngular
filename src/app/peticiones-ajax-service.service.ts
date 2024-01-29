import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class PeticionesAjaxServiceService {
  firestore = inject(Firestore);
  title = 'firebase-cms';

  constructor(private http: HttpClient) {
    
  }
  datosAPI:any[] = [];
  masBuscadas:any[] = [];
  detalle:any[] = [];
  datosFS:any[] = [];
  datosUsuario:any[] = [];

  peticionAjax() {
    this.http.get('https://api.coingecko.com/api/v3/coins/list').subscribe((datos:any) => {
      console.log(datos);
      this.datosAPI = datos.coins;  
    });
  }

  peticionAjaxBuscar(contenidoInput: string) {
    console.log(contenidoInput);
    this.http.get('https://api.coingecko.com/api/v3/search?query=' + contenidoInput ).subscribe((datos:any) => {
      console.log(datos);
      this.datosAPI = datos.coins;  
    });
  }

  peticionAjaxMasBuscadas() {
    this.http.get('https://api.coingecko.com/api/v3/search/trending').subscribe((datos:any) => {
      console.log(datos);
      this.masBuscadas = datos.coins;  
    });
  }

  // peticionAjaxDetalle(id: string) {
  //   this.http.get('https://api.coingecko.com/api/v3/coins/' + id ).subscribe((datos:any) => {
  //     console.log(datos);
  //     this.detalle = datos;  
  //   });
  // }

  peticionAjaxDetalle(id: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + id + "?sparkline=true" );
  }

  auth = getAuth();
  uid = this.auth.currentUser?.uid;

  obtenerDatosFS() {
    if (this.auth.currentUser) {
      this.uid = this.auth.currentUser.uid;
      const datosBaseDatos = query(collection(this.firestore, "monedas"), where("uid", "==", this.uid));
  
      getDocs(datosBaseDatos).then((response) => {
        this.datosFS = response.docs.map(doc => doc.data());
        console.log(this.datosFS);
        for (let i = 0; i < this.datosFS.length; i++) {
          this.peticionAjaxDetalle(this.datosFS[i].id).subscribe((datos:any) => {
            console.log(datos);
            this.datosFS[i].detalle = datos;
            this.datosUsuario.push(datos);
          });
        }
      })
    } else {
      console.log('No user is signed in.');
    }
  }

  getDatosAPI(): any[] {
    return this.datosUsuario;
  }

  // ngOnInit(): void {
  //   this.obtenerDatosFS();
  // }

}
