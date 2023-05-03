import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-datoshotel',
  templateUrl: './datoshotel.component.html',
  styleUrls: ['./datoshotel.component.css']
})
export class DatoshotelComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private _habitacionService: HabitacionService
  ){}

  nuevoTipoHabitacion= "";
  tipoHabitacion="";
  costo=0;
  cantidad=0;
  
  principal() {
    this.router.navigate(['/graficasmihotel']);
  }

  habitaciones() {
    this.router.navigate(['/datoshotel']);
  }

  nuevo_tipo_habitacion() {
    if (this.validarNuevoTipoHabitacion()) {
      let nuevo = {
        tipo_habitacion: this.nuevoTipoHabitacion
      }
      this._habitacionService.nuevo(nuevo).subscribe({
        next: () => {
          this.nuevoTipoHabitacion = '';
          location.reload();
          this.toastr.success('Hotel registrado correctamente', 'Correcto');
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        },
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
