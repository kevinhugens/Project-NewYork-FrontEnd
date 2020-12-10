import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTeamComponent } from './challenge-team.component';

describe('ChallengeTeamComponent', () => {
  let component: ChallengeTeamComponent;
  let fixture: ComponentFixture<ChallengeTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
