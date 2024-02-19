import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishJobsComponent } from './finish-jobs.component';

describe('FinishJobsComponent', () => {
  let component: FinishJobsComponent;
  let fixture: ComponentFixture<FinishJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
