import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
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
    user:'',
    password:''
  };
  constructor(
    private _inicioService: InicioService
  ){ }

  prueba() {
    if (this.newPassword === this.confirmNewPassword) {
      this.user.user = 'admin';
      this.user.password = this.newPassword;
      this._inicioService.newPassword(this.user).subscribe(
        data => {
          console.log(data);
        }
      )  
    }
  }
}
