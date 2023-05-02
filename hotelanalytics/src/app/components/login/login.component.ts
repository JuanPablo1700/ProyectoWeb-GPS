import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: string = '';
    password: string = '';

    constructor(
        private _userService: UserService,
        private toastr: ToastrService,
        private router: Router,
        private _errorService: ErrorService
    ) { }

    ngOnInit(): void { }

    async login() {
        if (this.user == '' || this.password == '') {
            this.toastr.error('Todos los campos son obligatorios', 'Error');
            return
        }

        const user: User = {
            user: this.user,
            password: this.password
        }

        await this._userService.login(user).subscribe({
            next: (data: any) => {
                const token = data.token;
                const activo = data.activo;
                const tipo_usuario = data.tipo_usuario;
                const pass_actualizada = data.pass_actualizada;
                const fk_id_hotel = data.fk_id_hotel;
                const estrellas = data.estrellas;
                const id_usuario = data.id_usuario;

                if (activo === "1") {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', user.user);
                    localStorage.setItem('tipo_usuario', tipo_usuario);
                    localStorage.setItem('fk_id_hotel', fk_id_hotel);
                    localStorage.setItem('estrellas', estrellas);
                    localStorage.setItem('id_usuario', id_usuario);
                    if (pass_actualizada == "0") {
                        this.router.navigate(['/inicio']);
                    } else {
                        if (tipo_usuario === "admin") {
                            this.router.navigate(['/principaldirector']);
                        } else if (tipo_usuario === "gerente") {
                            this.router.navigate(['/graficasmihotel']);
                        } else if (tipo_usuario === "recepcionista") {
                            this.router.navigate(['/registros']);
                        }
                    }
                } else {
                    this.toastr.error("Usuario desactivado", "Error");
                    this.router.navigate(['/login']);
                }
            },
            error: (e: HttpErrorResponse) => {
                this._errorService.msjError(e);
            },
            complete: () => console.log('complete')
        })
    }
}
