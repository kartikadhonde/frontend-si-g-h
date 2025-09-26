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

  // Dropdown data
  protected readonly crops = [
    'Arecanut','Arhar/Tur','Castor seed','Cotton(lint)','Dry chillies','Gram','Jute','Linseed','Maize','Mesta','Niger seed','Onion','Other  Rabi pulses','Potato','Rapeseed &Mustard','Rice','Sesamum','Small millets','Sugarcane','Sweet potato','Tapioca','Tobacco','Turmeric','Wheat','Bajra','Black pepper','Cardamom','Coriander','Garlic','Ginger','Groundnut','Horse-gram','Jowar','Ragi','Cashewnut','Banana','Soyabean','Barley','Khesari','Masoor','Moong(Green Gram)','Other Kharif pulses','Safflower','Sannhamp','Sunflower','Urad','Peas & beans (Pulses)','other oilseeds','Other Cereals','Cowpea(Lobia)','Oilseeds total','Guar seed','Other Summer Pulses','Moth'
  ];

  protected readonly states = [
    'Assam','Karnataka','Kerala','Meghalaya','West Bengal','Puducherry','Goa','Andhra Pradesh','Tamil Nadu','Odisha','Bihar','Gujarat','Madhya Pradesh','Maharashtra','Mizoram','Punjab','Uttar Pradesh','Haryana','Himachal Pradesh','Tripura','Nagaland','Chhattisgarh','Uttarakhand','Jharkhand','Delhi','Manipur','Jammu and Kashmir','Telangana','Arunachal Pradesh','Sikkim'
  ];

  protected readonly seasons = [
    'Whole Year ', 'Kharif     ', 'Rabi       ', 'Autumn     ', 'Summer     ', 'Winter     '
  ];

  constructor(private fb: FormBuilder) {
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

    const value = this.form.value as any;
    // Mock prediction logic
    setTimeout(() => {
      const randomYield = (Math.random() * 5 + 2).toFixed(2); // 2 - 7 tons/ha
      const confidenceLevels = ['High', 'Medium', 'Low'];
      const confidence = confidenceLevels[Math.floor(Math.random()*confidenceLevels.length)];
      const result: YieldPredictionResult = {
        predictedYield: `${randomYield} tons/ha`,
        confidence,
        cropType: value.crop,
        // Show state as location in history
        farmLocation: value.state,
        createdAt: new Date()
      };
      this.predictionGenerated.emit(result);
      this.isSubmitting.set(false);
    }, 1000);
  }
}
