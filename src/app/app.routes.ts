import { Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { autentificationGuard } from './autentification.guard';
import { MonedasComponent } from './monedas/monedas.component';
import { SearchComponent } from './search/search.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

export const routes: Routes = [
    { path: '', component: CuerpoComponent },
    { path: 'detalle/:id', component: DetalleComponent, canActivate: [autentificationGuard]},
    { path: 'search', component: SearchComponent, canActivate: [autentificationGuard]},
    { path: 'monedas/:uid', component: MonedasComponent, canActivate: [autentificationGuard]},
    { path: 'iniciarSesion', component: IniciarSesionComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
