import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaldirectorComponent } from './principaldirector.component';

describe('PrincipaldirectorComponent', () => {
  let component: PrincipaldirectorComponent;
  let fixture: ComponentFixture<PrincipaldirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipaldirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipaldirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
