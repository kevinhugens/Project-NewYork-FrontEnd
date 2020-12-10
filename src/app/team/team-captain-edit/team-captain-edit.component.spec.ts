import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCaptainEditComponent } from './team-captain-edit.component';

describe('TeamCaptainEditComponent', () => {
  let component: TeamCaptainEditComponent;
  let fixture: ComponentFixture<TeamCaptainEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCaptainEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCaptainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
