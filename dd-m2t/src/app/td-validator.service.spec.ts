import { TestBed } from '@angular/core/testing';

import { TdValidatorService } from './td-validator.service';

describe('TdValidatorService', () => {
  let service: TdValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
