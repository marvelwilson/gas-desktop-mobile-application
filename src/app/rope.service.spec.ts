import { TestBed } from '@angular/core/testing';

import { RopeService } from './rope.service';

describe('RopeService', () => {
  let service: RopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
