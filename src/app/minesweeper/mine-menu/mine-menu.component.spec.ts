import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineMenuComponent } from './mine-menu.component';

describe('MineMenuComponent', () => {
  let component: MineMenuComponent;
  let fixture: ComponentFixture<MineMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
