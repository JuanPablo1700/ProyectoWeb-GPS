import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficasmihotel',
  templateUrl: './graficasmihotel.component.html',
  styleUrls: ['./graficasmihotel.component.css'],
})
export class GraficasmihotelComponent implements OnInit{
  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit(): void {
    this.consultar();
  }

  tipoGraficas: number = 0;
  filtroConsulta: number = 0;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  motivo: any;
  parametros:any;

   /* motivo = [
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
  ]; */

  //Gráficas
  // motivo: any;
  view: [number, number] = [750, 400];

  get single() {
    return this.motivo;
  }


  consultar() {
    this.parametros = {
      "fechaInicio":this.fechaInicio,
      "fechaFin":this.fechaFin,
      "fk_id_hotel": localStorage.getItem('fk_id_hotel')
    }

    this.dataService.getMotivoHotel(this.parametros).subscribe(data=>{
      this.motivo = data;
    })
  }

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //finGráficas

  principal() {
    this.router.navigate(['/graficasmihotel']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login']);
  }
  
}

