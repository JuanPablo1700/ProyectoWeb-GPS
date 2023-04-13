import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    user: string = '';
    password: string = '';

    constructor(
        private _userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    login() {
        if (this.user == '' || this.password == '') {
            alert('Ingrese todos los datos');
            return
        }

        const user: User = {
            user: this.user,
            password: this.password
        }

        this._userService.login(user).subscribe({
            next: (token) => {
                this.router.navigate(['/inicio']);
                localStorage.setItem('token', token);
            },
            error: (e: HttpErrorResponse) => {
                alert('Error: ' + e.error.error);
            }
        })
    }
}
