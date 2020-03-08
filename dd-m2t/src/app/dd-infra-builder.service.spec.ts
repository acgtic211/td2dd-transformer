import { TestBed } from '@angular/core/testing';

import { DdInfraBuilderService } from './dd-infra-builder.service';

describe('DdInfraBuilderService', () => {
  let service: DdInfraBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DdInfraBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
