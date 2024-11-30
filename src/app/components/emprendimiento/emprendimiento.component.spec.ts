import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprendimientoComponent } from './emprendimiento.component';

describe('EmprendimientoComponent', () => {
  let component: EmprendimientoComponent;
  let fixture: ComponentFixture<EmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmprendimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
