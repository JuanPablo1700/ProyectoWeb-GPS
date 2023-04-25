import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficasxhotel',
  templateUrl: './graficasxhotel.component.html',
  styleUrls: ['./graficasxhotel.component.css']
})
export class GraficasxhotelComponent {

  constructor( private router: Router){}

  tipoGraficas:number = 0;
  filtroConsulta:number = 0;
  fechaInicio:Date = new Date;
  fechaFin:Date = new Date;

  principal() {
    this.router.navigate(['/graficasxhotel']);
  };

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }
}
