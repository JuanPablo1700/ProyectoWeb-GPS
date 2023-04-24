import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasxhotelComponent } from './graficasxhotel.component';

describe('GraficasxhotelComponent', () => {
  let component: GraficasxhotelComponent;
  let fixture: ComponentFixture<GraficasxhotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasxhotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasxhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
