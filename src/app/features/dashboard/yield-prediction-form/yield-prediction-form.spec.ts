import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldPredictionForm } from './yield-prediction-form';

describe('YieldPredictionForm', () => {
  let component: YieldPredictionForm;
  let fixture: ComponentFixture<YieldPredictionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YieldPredictionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YieldPredictionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
