import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSiniestroComponent } from './formulario-siniestro.component';

describe('FormularioSiniestroComponent', () => {
  let component: FormularioSiniestroComponent;
  let fixture: ComponentFixture<FormularioSiniestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioSiniestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
