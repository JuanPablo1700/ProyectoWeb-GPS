import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
//Componentes
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
<<<<<<< HEAD
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';
=======
import { AddTokenInterceptor } from './utils/add-token.interceptor';
>>>>>>> 0614dd2e5c6b9ae4f0f2e2273f84fbdc69444ea2

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PrincipaldirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
