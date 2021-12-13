import { TestBed } from '@angular/core/testing';

import { AppmanagerService } from './appmanager.service';

describe('AppmanagerService', () => {
  let service: AppmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
