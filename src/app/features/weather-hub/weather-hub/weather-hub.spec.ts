import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHub } from './weather-hub';

describe('WeatherHub', () => {
  let component: WeatherHub;
  let fixture: ComponentFixture<WeatherHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
