import { TestBed } from '@angular/core/testing';

import { SegurocompaniaService } from './segurocompania.service';

describe('SegurocompaniaService', () => {
  let service: SegurocompaniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegurocompaniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
