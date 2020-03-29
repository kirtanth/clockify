import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesheetComponent } from './showtimesheet.component';

describe('ShowtimesheetComponent', () => {
  let component: ShowtimesheetComponent;
  let fixture: ComponentFixture<ShowtimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
