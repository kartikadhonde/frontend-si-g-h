import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropGuide } from './crop-guide';

describe('CropGuide', () => {
  let component: CropGuide;
  let fixture: ComponentFixture<CropGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
