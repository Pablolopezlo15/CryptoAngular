import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PeticionesAjaxServiceService } from '../peticiones-ajax-service.service';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterModule, FormsModule, CabeceraComponent, FooterComponent],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css'
})
export class CuerpoComponent implements OnInit{

  contenidoInput = '';
  cryptos:any[] = [];
  cryptosMasBuscadas:any[] = [];
  cryptoDetalle:any[] = [];
  id: string = "";


  @Output() obtenerDetalle = new EventEmitter<string>();


  constructor(public ajax: PeticionesAjaxServiceService, private router: Router) { 
    
  }

  obtenDatos() {
    this.ajax.peticionAjax();
    this.cryptos = this.ajax.datosAPI;    
    this.obtenerDetalle.emit("Peticion realizada");
  }

  obtenDatosBuscar() {
    if (this.contenidoInput.length >= 2){
      this.ajax.peticionAjaxBuscar(this.contenidoInput);
    }  
    else {
      this.ajax.datosAPI = [];
    }
  }

  ngOnInit(): void {
    this.ajax.obtenerDatosFS();
    this.obtenDatosMasBuscadas();
  }

  obtenDatosMasBuscadas() {
    this.ajax.peticionAjaxMasBuscadas();
    this.cryptosMasBuscadas = this.ajax.masBuscadas;   
  }

  mostrarDetalle(id: any) {
    this.id = id;
    this.router.navigate(['/detalle', this.id]);
  }

}
