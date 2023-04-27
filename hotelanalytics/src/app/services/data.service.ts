import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* interface Country {
  name: string,
  series: [{
      name: string,
      value: number
    },
    {
      name: string,
      value: number
    },
    {
      name: string,
      value: number
    },
    {
      name: string,
      value: number
    },
    {
      name: string,
      value: number
    }
  ];
} */

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getMotivoGeneral()  {
    return this.http.get(`http://localhost:3000/api/data/getMotivoGeneral`);
  }
/* 
  private data: Country[] = [
    {
      "name": "Honguito",
      "series": [
        {
          "name": "Negocios",
          "value": 200
        },
        {
          "name": "Vacaciones",
          "value": 50
        },
        {
          "name": "Eventos especiales",
          "value": 100
        },
        {
          "name": "Turismo",
          "value": 100
        },
        {
          "name": "Visita a familiares o amigos",
          "value": 100
        }
      ]
    },
    {
      "name": "Honguito1",
      "series": [
        {
          "name": "Negocios",
          "value": 243
        },
        {
          "name": "Vacaciones",
          "value": 63
        },
        {
          "name": "Eventos especiales",
          "value": 142
        },
        {
          "name": "Turismo",
          "value": 13
        },
        {
          "name": "Visita a familiares o amigos",
          "value": 10
        }
      ]
    },
    {
      "name": "Honguito3",
      "series": [
        {
          "name": "Negocios",
          "value": 123
        },
        {
          "name": "Vacaciones",
          "value": 51
        },
        {
          "name": "Eventos especiales",
          "value": 31
        },
        {
          "name": "Turismo",
          "value": 24
        },
        {
          "name": "Visita a familiares o amigos",
          "value": 14
        }
      ]
    },
    {
      "name": "Honguito4",
      "series": [
        {
          "name": "Negocios",
          "value": 224
        },
        {
          "name": "Vacaciones",
          "value": 52
        },
        {
          "name": "Eventos especiales",
          "value": 143
        },
        {
          "name": "Turismo",
          "value": 12
        },
        {
          "name": "Visita a familiares o amigos",
          "value": 100
        }
      ]
    }
  ];

  get countryData() {
    return this.data;
  } */
}
