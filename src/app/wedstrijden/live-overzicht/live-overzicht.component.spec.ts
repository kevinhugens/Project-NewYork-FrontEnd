import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOverzichtComponent } from './live-overzicht.component';

describe('LiveOverzichtComponent', () => {
  let component: LiveOverzichtComponent;
  let fixture: ComponentFixture<LiveOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
