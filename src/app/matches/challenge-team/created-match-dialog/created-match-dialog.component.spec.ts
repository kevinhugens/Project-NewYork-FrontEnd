import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedMatchDialogComponent } from './created-match-dialog.component';

describe('CreatedMatchDialogComponent', () => {
  let component: CreatedMatchDialogComponent;
  let fixture: ComponentFixture<CreatedMatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedMatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
