import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YahtMenuComponent } from './yaht-menu.component';

describe('YahtMenuComponent', () => {
  let component: YahtMenuComponent;
  let fixture: ComponentFixture<YahtMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YahtMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YahtMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
