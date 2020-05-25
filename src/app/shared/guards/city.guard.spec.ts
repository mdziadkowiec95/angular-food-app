import { TestBed, async, inject } from '@angular/core/testing';

import { CityGuard } from './city.guard';

describe('CityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityGuard]
    });
  });

  it('should ...', inject([CityGuard], (guard: CityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
