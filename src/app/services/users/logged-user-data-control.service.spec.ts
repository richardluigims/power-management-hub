import { TestBed } from '@angular/core/testing';

import { LoggedUserDataControlService } from './logged-user-data-control.service';

describe('LoggedUserDataControlService', () => {
  let service: LoggedUserDataControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserDataControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
