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


  constructor(public ajax: PeticionesAjaxServiceService, private router: Router) { 
  }

  ngOnInit(): void {
    this.ajax.obtenerDatosFS();    
    console.log(this.ajax.obtenerDatosFS());
  }



}
