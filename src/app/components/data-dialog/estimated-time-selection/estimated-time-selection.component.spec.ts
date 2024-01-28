import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedTimeSelectionComponent } from './estimated-time-selection.component';

describe('EstimatedTimeSelectionComponent', () => {
  let component: EstimatedTimeSelectionComponent;
  let fixture: ComponentFixture<EstimatedTimeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedTimeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatedTimeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
