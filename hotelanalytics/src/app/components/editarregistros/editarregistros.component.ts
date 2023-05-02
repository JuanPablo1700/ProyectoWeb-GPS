import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Motivo } from 'src/app/interfaces/motivo';
import { Registro } from 'src/app/interfaces/registro';
import { TipoHabitacion } from 'src/app/interfaces/tipoHabitacion';
import { ErrorService } from 'src/app/services/error.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-editarregistros',
  templateUrl: './editarregistros.component.html',
  styleUrls: ['./editarregistros.component.css']
})
export class EditarregistrosComponent implements OnInit {

  ciudad:string="";
  motivo:string="";
  habitacion:string="";
  fecha_ingreso:any="";
  fecha_salida:any="";

  id_hotel:any;

  tipoHabitacion: TipoHabitacion[] = [];
  motivos: Motivo[] = [];

  registro: Registro;

  id: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private _registroService: RegistroService,
    private route: ActivatedRoute
  ) {
    this.registro = {
      fecha_ingreso: "",
      fecha_salida: "",
      ciudad_huesped: "",
      costo_estancia: 0,
      fk_id_habitacion_hotel: 0,
      fk_id_usuario: 0,
      fk_id_motivo: "",
      fk_id_hotel: 0,
      fk_id_tipoHabitacion: ""
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const idInt = parseInt(this.id);
    this.habitacion = "-1";
    this.motivo = "-1";
    this.id_hotel = localStorage.getItem('fk_id_hotel');
    this.getHabitaciones(this.id_hotel);
    this.getMotivos();
    this.getRegistro(idInt);
  }

  async getRegistro(id: number) {
    await this._registroService.getRegistro(id).subscribe({
      next: (data: any) => {
        this.registro = data;
        this.ciudad = data.ciudad_huesped;
        this.motivo = data.fk_id_motivo;
        this.habitacion = data.id_tipoHabitacion;
        this.fecha_ingreso = (data.fecha_ingreso).substring(0,10);
        this.fecha_salida = (data.fecha_salida).substring(0,10);
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  async getHabitaciones(id_hotel:number) {
    await this._registroService.getHabitacionesHotel(id_hotel).subscribe({
      next: (data) => {
        this.tipoHabitacion = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  async getMotivos() {
    await this._registroService.getMotivos().subscribe({
      next: (data) => {
        this.motivos = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  async actualizar() {
    this.registro.fecha_ingreso = this.fecha_ingreso;
    this.registro.fecha_salida = this.fecha_salida;
    this.registro.ciudad_huesped = this.ciudad;
    this.registro.fk_id_usuario = localStorage.getItem('id_usuario');
    this.registro.fk_id_hotel = localStorage.getItem('fk_id_hotel');
    this.registro.fk_id_tipoHabitacion = this.habitacion;
    this.registro.fk_id_motivo = this.motivo;
    
    await this._registroService.actualizar(this.id, this.registro).subscribe({
      next:() => {
        this.fecha_ingreso = "";
        this.fecha_salida = "";
        this.ciudad = "";
        this.habitacion = "-1";
        this.motivo = "-1";
        this.router.navigate(['/registros']);
        this.toastr.success('Hotel actualizado correctamente', 'Correcto');
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    })
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('fk_id_hotel');
    localStorage.removeItem('estrellas');
    localStorage.removeItem('id_usuario');
    this.router.navigate(['/login'])
  }
}
