import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YahtGameComponent } from './yaht-game.component';

describe('YahtGameComponent', () => {
  let component: YahtGameComponent;
  let fixture: ComponentFixture<YahtGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YahtGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YahtGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
