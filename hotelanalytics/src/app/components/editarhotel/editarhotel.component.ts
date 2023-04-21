import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from 'src/app/interfaces/hotel';
import { ErrorService } from 'src/app/services/error.service';
import { NewHotelService } from 'src/app/services/new-hotel.service';

@Component({
  selector: 'app-editarhotel',
  templateUrl: './editarhotel.component.html',
  styleUrls: ['./editarhotel.component.css']
})
export class EditarhotelComponent implements OnInit {

  
  id:any = 0;
  nombre: string = '';
  direccion: string = '';
  correo: string = '';
  telefono: string = '';
  estrellas: number = 0;
  estado: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _newHotelService: NewHotelService,
    private _errorService: ErrorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      // aquí puedes hacer lo que necesites con el valor de "id"
    });
    /* this.id = this.route.snapshot.paramMap.get('id'); */
    //this.getHotel();

  }

  private validar() {
    //falta validar selects y que sean teléfonos y correos válidos

    this.nombre = this.nombre.trim();
    this.direccion = this.direccion.trim();
    this.correo = this.correo.trim();
    this.telefono = this.telefono.trim();

    const telefonoRegex = /^(\+?\d{1,2}\s)?(\d{10,13})$/;
    const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    if (this.nombre == '') {
      this.toastr.error('Campo nombre obligatorio', 'Error')
      return false;
    }
    if (this.direccion == '') {
      this.toastr.error('Campo direccion obligatorio', 'Error')
      return false;
    }
    if (this.telefono == '') {
      this.toastr.error('Campo teléfono obligatorio', 'Error')
      return false;
    }
    if (!telefonoRegex.test(this.telefono)) {
      this.toastr.error('Teléfono inválido', 'Error')
      return false;
    }
    if (this.correo == '') {
      this.toastr.error('Campo correo obligatorio', 'Error')
      return false;
    }
    if (!correoRegex.test(this.correo)) {
      this.toastr.error('Correo inválido', 'Error')
      return false;
    }
    if (this.estrellas == -1) {
      this.toastr.error('Campo estrellas obligatorio', 'Error')
      return false;
    }
    if (this.estado.trim() == '') {
      this.toastr.error('Campo estado obligatorio', 'Error')
      return
    }
    return true;
  }

  actualizar() {
    if (this.validar()) {
      const hotel: Hotel = {
        id: this.id,
        nombre: this.nombre,
        direccion: this.direccion,
        correo: this.correo,
        telefono: this.telefono,
        estrellas: this.estrellas,
        estado: this.estado
      }

      this._newHotelService.newHotel(hotel).subscribe({
        next: () => {
          this.toastr.success('Hotel actualizado correctamente', 'Correcto');
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        }
      })
      this.router.navigate(['/principaldirector']);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login'])
  }
}
function getIdFromUrl(): string | null {
  throw new Error('Function not implemented.');
}

