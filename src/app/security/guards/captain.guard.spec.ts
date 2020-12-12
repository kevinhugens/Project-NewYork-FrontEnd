import { TestBed } from '@angular/core/testing';

import { CaptainGuard } from './captain.guard';

describe('CaptainGuard', () => {
  let guard: CaptainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CaptainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
