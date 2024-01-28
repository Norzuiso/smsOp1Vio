import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInstructionsComponent } from './process-instructions.component';

describe('ProcessInstrucctionsComponent', () => {
  let component: ProcessInstructionsComponent;
  let fixture: ComponentFixture<ProcessInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
