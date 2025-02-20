import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerGuardGuard } from './register.guard';

describe('registerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
