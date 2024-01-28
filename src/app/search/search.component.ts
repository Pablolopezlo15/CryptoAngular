import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PeticionesAjaxServiceService } from '../peticiones-ajax-service.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ CabeceraComponent, FooterComponent, RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  contenidoInput = '';
  cryptos:any[] = [];
  cryptosMasBuscadas:any[] = [];
  cryptoDetalle:any[] = [];
  id: string = "";

  constructor(public ajax: PeticionesAjaxServiceService, private router: Router) { 
  }

  ngOnInit(): void {
    this.obtenDatosMasBuscadas();
  }

  obtenDatosBuscar() {
    if (this.contenidoInput.length >= 2){
      this.ajax.peticionAjaxBuscar(this.contenidoInput);
    }  
    else {
      this.ajax.datosAPI = [];
    }
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
