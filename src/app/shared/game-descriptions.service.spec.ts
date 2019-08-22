import { TestBed } from '@angular/core/testing';

import { GameDescriptionsService } from './game-descriptions.service';

describe('GameDescriptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameDescriptionsService = TestBed.get(GameDescriptionsService);
    expect(service).toBeTruthy();
  });
});
