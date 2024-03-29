import { Component, Input, AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionesAjaxServiceService } from '../peticiones-ajax-service.service';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, Router } from '@angular/router';
import { BasedatosService } from '../basedatos.service';
import { getAuth } from "firebase/auth";
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports:  [ CommonModule, CabeceraComponent, FooterComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent implements OnInit, AfterViewInit{
  @Input() id: string = "";
  cryptoDetalle:any = null;
  cargando: boolean = false;

  auth = getAuth();
  uid = this.auth.currentUser?.uid;

  constructor(public ajax: PeticionesAjaxServiceService, private router: Router, private bd: BasedatosService) { 
    
  }

  ngOnInit(): void {
    this.obtenDatosDetalle();
  }

  obtenDatosDetalle() {
    // console.log(this.id);
    this.cargando = true;
    this.ajax.peticionAjaxDetalle(this.id).subscribe((datos: any) => {
      this.cryptoDetalle = datos;
      console.log(this.cryptoDetalle);
      this.cargando = false;
    });
  }

  yaGuardadaError = "";
  guardada = "";
  async guardarCrypto() {
    if (this.uid && this.cryptoDetalle && this.cryptoDetalle.id) {
      const yaGuardada = await this.bd.estaGuardada(this.uid, this.cryptoDetalle.id);

      this.yaGuardadaError = "";
      this.guardada = "";

      if (yaGuardada) {
        this.yaGuardadaError = "Ya tienes esta moneda en tu portfolio."
      } else {
        this.bd.datos = {
          uid: this.uid,
          id: this.cryptoDetalle.id
        };
    
        this.bd.subirDatosFS(this.bd.datos, this.bd.coleccion);
        this.guardada = "Moneda guardada en tu portfolio."
      }
    } else {
      this.router.navigate(['/iniciarSesion']);
    }
  }



  async ngAfterViewInit() {
    await this.getDataPoints();
  }
  
  async getDataPoints() {
    while (!this.cryptoDetalle) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  
    let dataPoints = [];
    let sparkline = this.cryptoDetalle.market_data.sparkline_7d.price;
  
    for (let i = 0; i < sparkline.length; i++) {
      dataPoints.push({
        x: i,
        y: sparkline[i]
      });
    }
  
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Gráfica"
      },
      data: [{
        type: "area",
        dataPoints: dataPoints
      }]
    });
  
    chart.render();
  }

}
