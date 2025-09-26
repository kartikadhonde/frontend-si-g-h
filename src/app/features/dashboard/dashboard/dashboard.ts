import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YieldPredictionFormComponent } from '../yield-prediction-form/yield-prediction-form';
import { PredictionHistoryComponent, PredictionRecord } from '../prediction-history/prediction-history';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, YieldPredictionFormComponent, PredictionHistoryComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  protected latestPrediction = signal<PredictionRecord | null>(null);
  protected predictions = signal<PredictionRecord[]>([]);

  protected readonly stats = [
    { title: 'Total Predictions', value: '1,234', change: '+12%', trend: 'up', icon: '📊', color: 'text-secondary' },
    { title: 'Active Farmers', value: '856', change: '+5%', trend: 'up', icon: '👥', color: 'text-primary' },
    { title: 'Avg. Accuracy', value: '94.2%', change: '+2.1%', trend: 'up', icon: '📈', color: 'text-secondary' },
    { title: 'Crops Analyzed', value: '47', change: '+3', trend: 'up', icon: '🌿', color: 'text-primary' }
  ];

  protected handlePredictionResult(result: PredictionRecord) {
    this.latestPrediction.set(result);
    this.predictions.update(list => [result, ...list].slice(0, 20));
  }

}
