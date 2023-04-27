import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';
import { NuevohotelComponent } from './components/nuevohotel/nuevohotel.component';
import { UsuarioscreadosComponent } from './components/usuarioscreados/usuarioscreados.component';
import { AuthGuard } from './utils/auth.guard';
import { EditarhotelComponent } from './components/editarhotel/editarhotel.component';
import { GraficasgeneralesComponent } from './components/graficasgenerales/graficasgenerales.component';
import { GraficasxhotelComponent } from './components/graficasxhotel/graficasxhotel.component';
import { DatoshotelComponent } from './components/datoshotel/datoshotel.component';
import { MicategoriaComponent } from './components/micategoria/micategoria.component';
import { GraficasmihotelComponent } from './components/graficasmihotel/graficasmihotel.component';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'inicio',component:InicioComponent, canActivate: [AuthGuard] },
  { path:"principaldirector",component:PrincipaldirectorComponent, canActivate: [AuthGuard] },
  { path:"nuevohotel",component:NuevohotelComponent, canActivate: [AuthGuard] },
  { path:"editarhotel/:id",component:EditarhotelComponent, canActivate: [AuthGuard] },
  { path:"usuarioscreados",component:UsuarioscreadosComponent, canActivate: [AuthGuard] }  ,
  {path:"graficasgenerales",component:GraficasgeneralesComponent},
  {path:"graficasxhotel",component:GraficasxhotelComponent},
  {path:"datoshotel",component:DatoshotelComponent},
  {path:"micategoria",component:MicategoriaComponent},
  {path:"graficasmihotel",component:GraficasmihotelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
