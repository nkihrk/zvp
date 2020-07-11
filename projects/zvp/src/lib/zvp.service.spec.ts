import { TestBed } from '@angular/core/testing';

import { ZvpService } from './zvp.service';

describe('ZvpService', () => {
  let service: ZvpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZvpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
