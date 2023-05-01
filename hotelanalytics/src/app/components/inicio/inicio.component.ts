import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { InicioService } from 'src/app/services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  newPassword = '';
  confirmNewPassword = '';
  user: User = {
    user: '',
    password: ''
  };
  constructor(
    private _inicioService: InicioService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  actualizarPassword() {
    const userLocal: any = localStorage.getItem('user');
    const tipo_usuario: any = localStorage.getItem('tipo_usuario');

    if (this.newPassword === "" || this.confirmNewPassword === "") {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    if (this.newPassword === this.confirmNewPassword) {
      this.user.user = userLocal;
      this.user.password = this.newPassword;
      this._inicioService.newPassword(this.user).subscribe({
        next: (res) => {
          this.toastr.success('Contraseña actualizadda correctamente', 'Correcto');
          if (tipo_usuario === "admin") {
            this.router.navigate(['/principaldirector']);
          } else if (tipo_usuario === "gerente") {
            this.router.navigate(['/graficasxhotel']);
          } else if (tipo_usuario === "recepcionista") {
            this.router.navigate(['/registros']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        }
      })
    } else {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return
    }
  }
}
