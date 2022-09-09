import { TestBed } from '@angular/core/testing';

import { MasterServService } from './master-serv.service';

describe('MasterServService', () => {
  let service: MasterServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
