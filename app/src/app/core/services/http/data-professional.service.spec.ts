import { TestBed } from '@angular/core/testing';

import { DataProfessionalService } from './data-professional.service';

describe('DataProfessionalService', () => {
  let service: DataProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProfessionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
