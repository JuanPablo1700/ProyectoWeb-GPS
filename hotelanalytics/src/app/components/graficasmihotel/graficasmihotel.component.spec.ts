import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasmihotelComponent } from './graficasmihotel.component';

describe('GraficasmihotelComponent', () => {
  let component: GraficasmihotelComponent;
  let fixture: ComponentFixture<GraficasmihotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasmihotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasmihotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
