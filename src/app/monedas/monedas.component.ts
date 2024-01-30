import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PeticionesAjaxServiceService } from '../peticiones-ajax-service.service';


@Component({
  selector: 'app-monedas',
  standalone: true,
  imports: [ CommonModule, CabeceraComponent, FooterComponent, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './monedas.component.html',
  styleUrl: './monedas.component.css'
})
export class MonedasComponent implements OnInit{

  monedas: any[] = [];
  id: string = "";

  constructor(public ajax: PeticionesAjaxServiceService, private router: Router) { 
  }

  ngOnInit() {
    this.monedas = [];
    this.ajax.obtenerDatosFS();
    this.monedas = this.ajax.getDatosAPI();
  }

  mostrarDetalle(id: any) {
    this.id = id;
    this.router.navigate(['/detalle', this.id]);
  }



}
