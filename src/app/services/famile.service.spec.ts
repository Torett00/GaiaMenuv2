import { TestBed } from '@angular/core/testing';

import { FamileService } from './famile.service';

describe('FamileService', () => {
  let service: FamileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
