import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PredictionRecord {
  predictedYield: string;
  confidence: string;
  cropType: string;
  farmLocation: string;
  createdAt: Date;
  // Optional raw numeric value and unit extracted from backend response
  predictedYieldValue?: number;
  predictedYieldUnit?: string;
  recommendations?: string[];
}

@Component({
  selector: 'app-prediction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction-history.html',
  styleUrl: './prediction-history.css'
})
export class PredictionHistoryComponent {
  @Input() predictions: PredictionRecord[] = [];

  protected confidenceBadge(conf: string) {
    const base = 'badge';
    if (conf === 'High') return base + ' badge-secondary';
    if (conf === 'Medium') return base + ' badge-warning';
    return base + ' badge-danger';
  }
}
