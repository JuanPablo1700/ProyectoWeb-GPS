import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasgeneralesComponent } from './graficasgenerales.component';

describe('GraficasgeneralesComponent', () => {
  let component: GraficasgeneralesComponent;
  let fixture: ComponentFixture<GraficasgeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasgeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasgeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
