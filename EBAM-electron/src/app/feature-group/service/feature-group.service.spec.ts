import { TestBed } from '@angular/core/testing';

import { FeatureGroupService } from './feature-group.service';

describe('FeatureGroupService', () => {
  let service: FeatureGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
