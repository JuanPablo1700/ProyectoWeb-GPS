import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarhotelComponent } from './editarhotel.component';

describe('EditarhotelComponent', () => {
  let component: EditarhotelComponent;
  let fixture: ComponentFixture<EditarhotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarhotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
