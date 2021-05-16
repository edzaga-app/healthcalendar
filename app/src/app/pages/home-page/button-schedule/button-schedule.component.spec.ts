import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonScheduleComponent } from './button-schedule.component';

describe('ButtonScheduleComponent', () => {
  let component: ButtonScheduleComponent;
  let fixture: ComponentFixture<ButtonScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
