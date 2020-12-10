import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddUserComponent } from './team-add-user.component';

describe('TeamAddUserComponent', () => {
  let component: TeamAddUserComponent;
  let fixture: ComponentFixture<TeamAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
