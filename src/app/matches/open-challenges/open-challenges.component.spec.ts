import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChallengesComponent } from './open-challenges.component';

describe('OpenChallengesComponent', () => {
  let component: OpenChallengesComponent;
  let fixture: ComponentFixture<OpenChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
