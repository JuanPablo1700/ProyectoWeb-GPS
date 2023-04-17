import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';
import { NuevohotelComponent } from './components/nuevohotel/nuevohotel.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'inicio',component:InicioComponent
  },
  {
    path:"principaldirector",component:PrincipaldirectorComponent
  },
  {
    path:"nuevohotel",component:NuevohotelComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
