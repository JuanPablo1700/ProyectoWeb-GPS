import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarregistrosComponent } from './editarregistros.component';

describe('EditarregistrosComponent', () => {
  let component: EditarregistrosComponent;
  let fixture: ComponentFixture<EditarregistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarregistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarregistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
