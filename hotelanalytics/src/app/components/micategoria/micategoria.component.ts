import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-micategoria',
  templateUrl: './micategoria.component.html',
  styleUrls: ['./micategoria.component.css']
})
export class MicategoriaComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private dataService: DataService) { }

  ngOnInit(): void {
    this.filtroConsulta = -1;
  }

  filtroConsulta: number = 0;
  fechaInicio: any = "";
  fechaFin: any = "";

  graficasVisibles = 0;

  motivo: any;
  ciudad: any;
  parametros: any;

  consultar() {
    const hoy = new Date();

    if (this.filtroConsulta == -1) {
      this.graficasVisibles = 0;
      return this.toastr.error('Seleccione un tipo de gráfica', 'Error');
    }
    if (this.filtroConsulta == 1) { //Este día
      this.fechaInicio = hoy;
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 2) { //Esta semana
      this.fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); //inicio de la semana actual empezando por domingo
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 3) { //Este mes
      this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1); //inicio de mes actual
      this.fechaFin = hoy;
    }
    if (this.filtroConsulta == 4) { //Personalizado
      if (this.fechaInicio == "" || this.fechaFin == "") {
        this.graficasVisibles = 0;
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
      if (this.fechaInicio > this.fechaFin) {
        this.graficasVisibles = 0;
        return this.toastr.error('Seleccione fecha inicio y fecha fin correctamente', 'Error');
      }
    }
    console.log('inicio: ' + this.fechaInicio);
    console.log('fin: ' + this.fechaFin);

    this.parametros = {
      "fechaInicio": this.fechaInicio,
      "fechaFin": this.fechaFin,
      "estrellas": localStorage.getItem('estrellas')
    }

    this.graficasVisibles = 1;

    this.ciudad = this.dataService.getCiudadHotel(this.parametros).subscribe(data => {
      this.ciudad = data;
    })

    return this.dataService.getMotivoCategoria(this.parametros).subscribe(data => {
      this.motivo = data;
    })
  }

  //Gráficas
  // motivo: any;
  view: [number, number] = [750, 400];

  get single() {
    return this.motivo;
  }
  get single2() {
    return this.ciudad;
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
  habitaciones() {
    this.router.navigate(['/datoshotel']);
  }
  micategoria() {
    this.router.navigate(['/micategoria']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('fk_id_hotel');
    localStorage.removeItem('estrellas');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('id_usuario');
    this.router.navigate(['/login']);
  }
}
