import { TestBed } from '@angular/core/testing';

import { RefreshmentUsageService } from './refreshment-usage.service';

describe('RefreshmentUsageService', () => {
  let service: RefreshmentUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshmentUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
