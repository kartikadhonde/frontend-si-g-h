import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiToastHost } from './ui-toast-host';

describe('UiToastHost', () => {
  let component: UiToastHost;
  let fixture: ComponentFixture<UiToastHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiToastHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiToastHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
