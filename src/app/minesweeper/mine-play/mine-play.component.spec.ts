import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePlayComponent } from './mine-play.component';

describe('MinePlayComponent', () => {
  let component: MinePlayComponent;
  let fixture: ComponentFixture<MinePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
