import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoHabitacion } from 'src/app/interfaces/tipoHabitacion';
import { ErrorService } from 'src/app/services/error.service';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-datoshotel',
  templateUrl: './datoshotel.component.html',
  styleUrls: ['./datoshotel.component.css']
})
export class DatoshotelComponent implements OnInit{
  tipoUsuario:any;

  id_hotel: any;
  nuevoTipoHabitacion= "";
  tipoHabitacion: string = "";
  listaTipoHabitacion: any[] = [];
  listaHabitaciones: any[] = [];
  datosHabitacion: any;
  costo=0;
  cantidad=0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private _habitacionService: HabitacionService
  ){}
  ngOnInit(): void {
    this.tipoUsuario = localStorage.getItem('tipo_usuario');

    if (this.tipoUsuario != "gerente") {
      this.logOut();
    }

    this.tipoHabitacion = "-1";
    this.id_hotel = localStorage.getItem('fk_id_hotel');
    this.getHabitaciones(this.id_hotel);
    this.getTiposHabitaciones();
  }

  principal() {
    this.router.navigate(['/graficasmihotel']);
  }

  micategoria() {
    this.router.navigate(['/micategoria']);
  }

  habitaciones() {
    this.router.navigate(['/datoshotel']);
  }

  getHabitaciones(id_hotel: number) {
    this._habitacionService.getHabitacionesHotel(id_hotel).subscribe({
      next: (data) => {
        this.listaHabitaciones = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      },
    });
  }

  getTiposHabitaciones() {
    this._habitacionService.getTiposHabitaciones().subscribe({
      next: (data) => {
        this.listaTipoHabitacion = data;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      },
    });
  }
  nuevo_tipo_habitacion() {
    if (this.validarNuevoTipoHabitacion()) {
      let nuevo = {
        tipo_habitacion: this.nuevoTipoHabitacion
      }
      this._habitacionService.nuevo(nuevo).subscribe({
        next: (response) => {
          this.handleResponse(response);
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    }
  }
  
  handleResponse(response:any) {
    console.log(response);
    
    this.nuevoTipoHabitacion = '';
    this.toastr.success('Tipo de habitación registrado correctamente', 'Correcto');
  }
  
  handleError(error:any) {
    console.log(error);
    
    this.nuevoTipoHabitacion = '';
    this.toastr.success('La habitación ya existe', 'Correcto');
    /* this._errorService.msjError(error); */
  }

  
 /*  nuevo_tipo_habitacion() {
    if (this.validarNuevoTipoHabitacion()) {
      let nuevo = {
        tipo_habitacion: this.nuevoTipoHabitacion
      }
      this._habitacionService.nuevo(nuevo).subscribe({
        next: () => {
          this.toastr.success('Tipo de habitación registrado correctamente', 'Correcto');
          this.nuevoTipoHabitacion = '';
          location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.nuevoTipoHabitacion = '';
          this.toastr.error('La habitación ya existe', 'Correcto');
         
        }
      });
    }
  } */

  actualizar(id:number) {
    this._habitacionService.getHabitacionById(id).subscribe({
      next: (data) => {
        this.tipoHabitacion = data.fk_id_tipoHabitacion + "";
        this.costo = data.precio;
        this.cantidad = data.cantidad;
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      },
    });
  }

  valida() {
    if (this.tipoHabitacion == "-1") {
      this.toastr.error('Seleccione un tipo de habitación', 'Error');
      return false;
    }
    if (this.cantidad == null) {
      console.log("cantidad: "+ this.cantidad);
      
      this.toastr.error('Ingrese una cantidad', 'Error');
      return false;
    }
    if (this.costo == null) {
      this.toastr.error('Ingrese un precio', 'Error');
      return false;
    }
    return true;
  }

  guardar() {
    if (this.valida()) {
      this.datosHabitacion = {
        cantidad: this.cantidad,
        disponible: this.cantidad,
        precio: this.costo,
        fk_id_tipoHabitacion: this.tipoHabitacion,
        fk_id_hotel: this.id_hotel
      }
      
      this._habitacionService.nuevaHabitacion(this.datosHabitacion).subscribe({
        next: () => {
          this.tipoHabitacion = '-1';
          this.cantidad = 0;
          this.costo = 0;
          this.toastr.success('Habitación de hotel registrado correctamente', 'Correcto');
        }
      });
    }
  }

  validarNuevoTipoHabitacion() {
    this.nuevoTipoHabitacion = this.nuevoTipoHabitacion.trim();

    if (this.nuevoTipoHabitacion == '') {
      this.toastr.error('Escriba un nuevo tipo de habitacion', 'Error');
      return false;
    }
    return true;
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
