import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoshotelComponent } from './datoshotel.component';

describe('DatoshotelComponent', () => {
  let component: DatoshotelComponent;
  let fixture: ComponentFixture<DatoshotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoshotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatoshotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
