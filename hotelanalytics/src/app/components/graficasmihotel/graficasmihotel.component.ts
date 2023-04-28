import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficasmihotel',
  templateUrl: './graficasmihotel.component.html',
  styleUrls: ['./graficasmihotel.component.css']
})
export class GraficasmihotelComponent {

  constructor( private router: Router){}

  tipoGraficas:number = 0;
  filtroConsulta:number = 0;
  fechaInicio:Date = new Date;
  fechaFin:Date = new Date;

   motivo = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  //Gráficas
 // motivo: any;
  view: [number, number] = [750, 400];
  
  get multi(){
    return this.motivo;
  }

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //finGráficas

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
