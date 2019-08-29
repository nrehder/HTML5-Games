import { TestBed } from '@angular/core/testing';

import { MinesweeperService } from './minesweeper.service';

describe('MinesweeperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinesweeperService = TestBed.get(MinesweeperService);
    expect(service).toBeTruthy();
  });
});
