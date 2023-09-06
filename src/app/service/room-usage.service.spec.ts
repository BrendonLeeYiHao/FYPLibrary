import { TestBed } from '@angular/core/testing';

import { RoomUsageService } from './room-usage.service';

describe('RoomUsageService', () => {
  let service: RoomUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
