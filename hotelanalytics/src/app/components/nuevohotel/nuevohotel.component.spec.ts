import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevohotelComponent } from './nuevohotel.component';

describe('NuevohotelComponent', () => {
  let component: NuevohotelComponent;
  let fixture: ComponentFixture<NuevohotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevohotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevohotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
