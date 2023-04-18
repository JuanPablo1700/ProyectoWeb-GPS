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

    ngOnInit(): void {

    }

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
            next: (json) => {
                const data = json.split("-");

                const token = data[0];
                const activo = data[1];
                const tipo_usuario = data[2];
                const pass_actualizada = data[3];

                if (activo === "1") {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', user.user);
                    localStorage.setItem('tipo_usuario', tipo_usuario);
                    if (pass_actualizada === "0") {
                        this.router.navigate(['/inicio']);
                    } else {
                        if (tipo_usuario === "admin") {
                            this.router.navigate(['/principaldirector']);
                        } else if (tipo_usuario === "gerente") {
                            this.router.navigate(['/principalgerente']);
                        } else if (tipo_usuario === "recepcionista") {
                            this.router.navigate(['/principalrecepcionista']);
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
