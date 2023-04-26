import { Injectable } from '@angular/core';

interface Country {
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
  ]
  /* hotel: string,
  motivo: [{
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
  ]; */
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data: Country[] = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "France1",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "France2",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "France3",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        },
        {
          "name": "2012",
          "value": 8940000
        },
        {
          "name": "2013",
          "value": 8940000
        }
      ]
    }
    
    /* {
      "hotel": "Honguito",
      "motivo": [
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
      "hotel": "Honguito1",
      "motivo": [
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
      "hotel": "Honguito3",
      "motivo": [
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
      "hotel": "Honguito4",
      "motivo": [
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
    } */
  ];

  get countryData() {
    return this.data;
  }
}
