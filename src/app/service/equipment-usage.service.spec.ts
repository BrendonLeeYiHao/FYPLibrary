import { TestBed } from '@angular/core/testing';

import { EquipmentUsageService } from './equipment-usage.service';

describe('EquipmentUsageService', () => {
  let service: EquipmentUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
