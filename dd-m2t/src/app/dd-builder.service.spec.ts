import { TestBed } from '@angular/core/testing';

import { DdBuilderService } from './dd-builder.service';

describe('DdBuilderService', () => {
  let service: DdBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DdBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
