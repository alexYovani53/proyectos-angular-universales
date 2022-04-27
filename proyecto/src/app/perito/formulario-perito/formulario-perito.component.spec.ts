import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPeritoComponent } from './formulario-perito.component';

describe('FormularioPeritoComponent', () => {
  let component: FormularioPeritoComponent;
  let fixture: ComponentFixture<FormularioPeritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPeritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
