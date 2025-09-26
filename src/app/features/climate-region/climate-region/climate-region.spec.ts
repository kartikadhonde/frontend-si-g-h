import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateRegion } from './climate-region';

describe('ClimateRegion', () => {
  let component: ClimateRegion;
  let fixture: ComponentFixture<ClimateRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateRegion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimateRegion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
