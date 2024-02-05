import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTimerComponent } from './process-timer.component';

describe('ProcessTimerComponent', () => {
  let component: ProcessTimerComponent;
  let fixture: ComponentFixture<ProcessTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
