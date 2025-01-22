import { TestBed } from '@angular/core/testing';

import { FeaturePreConditionService } from './feature-pre-condition.service';

describe('FeaturePreConditionService', () => {
  let service: FeaturePreConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturePreConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
