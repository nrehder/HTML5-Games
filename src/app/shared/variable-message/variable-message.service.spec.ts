import { TestBed } from '@angular/core/testing';

import { VariableMessageService } from './variable-message.service';

describe('VariableMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariableMessageService = TestBed.get(VariableMessageService);
    expect(service).toBeTruthy();
  });
});
