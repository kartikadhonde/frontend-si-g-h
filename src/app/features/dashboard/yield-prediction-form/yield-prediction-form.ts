import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService, PredictPayload, PredictResponse } from '../../../http-service';
import { finalize } from 'rxjs/operators';

interface YieldPredictionResult {
  predictedYield: string;
  confidence: string;
  cropType: string;
  farmLocation: string;
  createdAt: Date;
  predictedYieldValue?: number;
  predictedYieldUnit?: string;
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

  // Dropdown data
  protected readonly crops = [
    'Arecanut','Arhar/Tur','Castor seed','Cotton(lint)','Dry chillies','Gram','Jute','Linseed','Maize','Mesta','Niger seed','Onion','Other  Rabi pulses','Potato','Rapeseed &Mustard','Rice','Sesamum','Small millets','Sugarcane','Sweet potato','Tapioca','Tobacco','Turmeric','Wheat','Bajra','Black pepper','Cardamom','Coriander','Garlic','Ginger','Groundnut','Horse-gram','Jowar','Ragi','Cashewnut','Banana','Soyabean','Barley','Khesari','Masoor','Moong(Green Gram)','Other Kharif pulses','Safflower','Sannhamp','Sunflower','Urad','Peas & beans (Pulses)','other oilseeds','Other Cereals','Cowpea(Lobia)','Oilseeds total','Guar seed','Other Summer Pulses','Moth'
  ];

  protected readonly states = [
    'Assam','Karnataka','Kerala','Meghalaya','West Bengal','Puducherry','Goa','Andhra Pradesh','Tamil Nadu','Odisha','Bihar','Gujarat','Madhya Pradesh','Maharashtra','Mizoram','Punjab','Uttar Pradesh','Haryana','Himachal Pradesh','Tripura','Nagaland','Chhattisgarh','Uttarakhand','Jharkhand','Delhi','Manipur','Jammu and Kashmir','Telangana','Arunachal Pradesh','Sikkim'
  ];

  protected readonly seasons = [
    'Whole Year', 'Kharif', 'Rabi', 'Autumn', 'Summer', 'Winter'
  ];

  constructor(private fb: FormBuilder, private api: HttpService) {
    this.form = this.fb.group({
      crop: ['', Validators.required],
      cropYear: [new Date().getFullYear(), [Validators.required, Validators.min(1950), Validators.max(2100)]],
      season: ['', Validators.required],
      state: ['', Validators.required],
      area: [null, [Validators.required, Validators.min(0.01)]],
      annualRainfall: [null, [Validators.required, Validators.min(0)]],
      fertilizer: [null, [Validators.required, Validators.min(0)]],
      pesticide: [null, [Validators.required, Validators.min(0)]]
    });
  }

  protected submit() {
    if (this.form.invalid || this.isSubmitting()) return;
    this.isSubmitting.set(true);

    const v = this.form.value as any;
    const payload: PredictPayload = {
      Crop: String(v.crop).trim(),
      Crop_Year: Number(v.cropYear),
      Season: String(v.season).trim(),
      State: String(v.state).trim(),
      Area: Number(v.area),
      Annual_Rainfall: Number(v.annualRainfall),
      Fertilizer: Number(v.fertilizer),
      Pesticide: Number(v.pesticide)
    };

    this.api
      .predictYield(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (res: PredictResponse) => {
          // For debugging exact backend values in devtools
          console.debug('[Predict] response', res);
          const y = (res.predicted_yield ?? res.yield ?? res.Yield) as number | string | undefined;
          const yieldNum = typeof y === 'string' ? parseFloat(y) : y;
          const yieldStr = typeof yieldNum === 'number' && !Number.isNaN(yieldNum) ? yieldNum.toFixed(2) : (y ?? '');
          const result: YieldPredictionResult = {
            predictedYield: yieldStr ? `${yieldStr} tons/ha` : '—',
            confidence: String(res.confidence ?? 'High'),
            cropType: payload.Crop,
            farmLocation: payload.State,
            createdAt: new Date(),
            predictedYieldValue: typeof yieldNum === 'number' && !Number.isNaN(yieldNum) ? yieldNum : undefined,
            predictedYieldUnit: typeof (res as any).unit === 'string' ? (res as any).unit as string : undefined
          };
          this.predictionGenerated.emit(result);
        },
        error: () => {
          const fallback: YieldPredictionResult = {
            predictedYield: '—',
            confidence: 'Low',
            cropType: payload.Crop,
            farmLocation: payload.State,
            createdAt: new Date()
          };
          this.predictionGenerated.emit(fallback);
          alert('Prediction failed. Please ensure the backend is running at http://localhost:8000/predict');
        }
      });
  }
}
