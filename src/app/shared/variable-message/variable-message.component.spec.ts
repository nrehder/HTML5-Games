import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableMessageComponent } from './variable-message.component';

describe('VariableMessageComponent', () => {
  let component: VariableMessageComponent;
  let fixture: ComponentFixture<VariableMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
