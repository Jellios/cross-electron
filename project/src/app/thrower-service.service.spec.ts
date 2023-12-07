import { TestBed } from '@angular/core/testing';

import { ThrowerServiceService } from './thrower-service.service';

describe('ThrowerServiceService', () => {
  let service: ThrowerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThrowerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
