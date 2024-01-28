import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from "firebase/auth";
import { addDoc, getDocs, collection } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  firestore = inject(Firestore);
  title = 'firebase-cms';
  coleccion:string = "monedas";
  auth = getAuth();
  user = this.auth.currentUser;
  uid = this.user?.uid;
  monedaId:string = "";

  constructor() { }

  datos:any = {
    uid: this.uid,
    moneda: this.monedaId
  };

  subirDatosFS(datos: any, coleccion: string) {
    
    try {
      const docRef = addDoc(collection(this.firestore, coleccion), datos);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
