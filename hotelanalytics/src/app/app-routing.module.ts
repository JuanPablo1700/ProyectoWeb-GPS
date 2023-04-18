import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';
import { NuevohotelComponent } from './components/nuevohotel/nuevohotel.component';
import { UsuarioscreadosComponent } from './components/usuarioscreados/usuarioscreados.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'inicio',component:InicioComponent, canActivate: [AuthGuard] },
  { path:"principaldirector",component:PrincipaldirectorComponent, canActivate: [AuthGuard] },
  { path:"nuevohotel",component:NuevohotelComponent, canActivate: [AuthGuard] },
  { path:"usuarioscreados",component:UsuarioscreadosComponent, canActivate: [AuthGuard] }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
