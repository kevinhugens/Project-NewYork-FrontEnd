import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGamesComponent } from './make-games.component';

describe('MakeGamesComponent', () => {
  let component: MakeGamesComponent;
  let fixture: ComponentFixture<MakeGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
