import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AddTokenInterceptor } from './utils/add-token.interceptor';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';

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
