import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'; 
import { CabeceraComponent } from './cabecera/cabecera.component';
import { DetalleComponent } from './detalle/detalle.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CabeceraComponent, DetalleComponent ,CuerpoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: '../assets/styles.css',

})
export class AppComponent implements OnInit {
  title = 'CryptoAngular';
  ngOnInit(): void {
  }

}
