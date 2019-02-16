import { TestBed } from '@angular/core/testing';

import { AppContextService } from './app-context.service';

describe('AppContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppContextService = TestBed.get(AppContextService);
    expect(service).toBeTruthy();
  });
});
