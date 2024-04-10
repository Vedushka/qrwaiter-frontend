import { TestBed } from '@angular/core/testing';

import { FierBaseService } from './fier-base.service';

describe('FierBaseService', () => {
  let service: FierBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FierBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
