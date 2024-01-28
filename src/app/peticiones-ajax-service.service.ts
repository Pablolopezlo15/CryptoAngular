import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, collection } from 'firebase/firestore';

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


  obtenerDatosFS() {
    getDocs(collection(this.firestore, "monedas")).then((response) => {
      this.datosFS = response.docs.map(doc => doc.data());
      console.log(this.datosFS);
    })
  }

  // ngOnInit(): void {
  //   this.obtenerDatosFS();
  // }

}
