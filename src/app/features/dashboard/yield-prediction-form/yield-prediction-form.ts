import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface YieldPredictionResult {
  predictedYield: string;
  confidence: string;
  cropType: string;
  farmLocation: string;
  createdAt: Date;
}

@Component({
  selector: 'app-yield-prediction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './yield-prediction-form.html',
  styleUrl: './yield-prediction-form.css'
})
export class YieldPredictionFormComponent {
  @Output() predictionGenerated = new EventEmitter<YieldPredictionResult>();

  protected isSubmitting = signal(false);
  protected form: FormGroup;

  protected readonly crops = [
    'wheat','rice','maize','soybean','cotton','sugarcane','groundnut','potato'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      farmLocation: ['', [Validators.required, Validators.minLength(2)]],
      cropType: ['', Validators.required],
      soilType: ['', Validators.required],
      acreage: [null, [Validators.required, Validators.min(0.1)]],
      sowingDate: ['', Validators.required]
    });
  }

  protected submit() {
    if (this.form.invalid || this.isSubmitting()) return;
    this.isSubmitting.set(true);

    const value = this.form.value;
    // Mock prediction logic
    setTimeout(() => {
      const randomYield = (Math.random() * 5 + 2).toFixed(2); // 2 - 7 tons/ha
      const confidenceLevels = ['High', 'Medium', 'Low'];
      const confidence = confidenceLevels[Math.floor(Math.random()*confidenceLevels.length)];
      const result: YieldPredictionResult = {
        predictedYield: `${randomYield} tons/ha`,
        confidence,
        cropType: value.cropType,
        farmLocation: value.farmLocation,
        createdAt: new Date()
      };
      this.predictionGenerated.emit(result);
      this.isSubmitting.set(false);
    }, 1000);
  }
}
