import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicategoriaComponent } from './micategoria.component';

describe('MicategoriaComponent', () => {
  let component: MicategoriaComponent;
  let fixture: ComponentFixture<MicategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
