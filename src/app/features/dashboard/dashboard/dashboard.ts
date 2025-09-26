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

  protected handlePredictionResult(result: PredictionRecord) {
    this.latestPrediction.set(result);
    this.predictions.update(list => [result, ...list]);
  }

  // Style the confidence badge similar to history component
  protected confidenceBadge(conf?: string) {
    const base = 'badge latest-prediction__confidence';
    if (!conf) return base;
    if (conf === 'High') return base + ' badge-secondary';
    if (conf === 'Medium') return base + ' badge-warning';
    return base + ' badge-danger';
  }

  // Human-readable unit label
  protected unitLabel(u?: string): string {
    if (!u) return 'tons/ha';
    if (u === 'tons_per_hectare') return 'tons/ha';
    return u;
  }

}
