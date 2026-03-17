import { TestBed } from '@angular/core/testing';

import { FocusStore } from './focus-store';

describe('FocusStore', () => {
  let service: FocusStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
