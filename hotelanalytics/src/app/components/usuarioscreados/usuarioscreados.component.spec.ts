import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioscreadosComponent } from './usuarioscreados.component';

describe('UsuarioscreadosComponent', () => {
  let component: UsuarioscreadosComponent;
  let fixture: ComponentFixture<UsuarioscreadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioscreadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioscreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
