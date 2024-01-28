import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autentificationGuard } from './autentification.guard';

describe('autentificationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autentificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
