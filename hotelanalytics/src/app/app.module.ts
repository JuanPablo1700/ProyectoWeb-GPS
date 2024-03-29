import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

//Modulos
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { AddTokenInterceptor } from './utils/add-token.interceptor';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipaldirectorComponent } from './components/principaldirector/principaldirector.component';
import { NuevohotelComponent } from './components/nuevohotel/nuevohotel.component';
import { EditarhotelComponent } from './components/editarhotel/editarhotel.component';
import { DatoshotelComponent } from './components/datoshotel/datoshotel.component';
import { MicategoriaComponent } from './components/micategoria/micategoria.component';
import { GraficasmihotelComponent } from './components/graficasmihotel/graficasmihotel.component';
import { GraficasgeneralesComponent } from './components/graficasgenerales/graficasgenerales.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RegistrosComponent } from './components/registros/registros.component';
import { EditarregistrosComponent } from './components/editarregistros/editarregistros.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PrincipaldirectorComponent,
    NuevohotelComponent,
    EditarhotelComponent,
    DatoshotelComponent,
    MicategoriaComponent,
    GraficasmihotelComponent,
    GraficasgeneralesComponent,
    RegistrosComponent,
    EditarregistrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
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
