import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WeatherData {
  current: { temperature: number; condition: string; humidity: number; windSpeed: number; pressure: number; visibility: number; uvIndex: number; sunrise: string; sunset: string; };
  forecast: { day: string; high: number; low: number; condition: string; precipitation: number }[];
  soil: { temperature: number; moisture: number; ph: number; nitrogen: number; phosphorus: number; potassium: number };
  agriculture: { cropStage: string; irrigationNeeded: boolean; pestRisk: string; diseaseRisk: string; harvestWindow: string };
}

@Component({
  selector: 'app-weather-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-hub.html',
  styleUrl: './weather-hub.css'
})
export class WeatherHubComponent {
  protected selectedState = signal('Punjab');
  protected weatherData = signal<WeatherData | null>(null);
  protected isLoading = signal(false);

  protected readonly states = [ 'Punjab','Haryana','Uttar Pradesh' ];

  private mockWeather: WeatherData = {
    current: { temperature: 28, condition: 'Partly Cloudy', humidity:65, windSpeed:12, pressure:1013, visibility:10, uvIndex:6, sunrise:'06:15', sunset:'18:45' },
    forecast: [
      { day:'Today', high:32, low:24, condition:'Partly Cloudy', precipitation:10 },
      { day:'Tomorrow', high:30, low:22, condition:'Light Rain', precipitation:60 },
      { day:'Monday', high:28, low:20, condition:'Rainy', precipitation:80 },
      { day:'Tuesday', high:26, low:19, condition:'Heavy Rain', precipitation:90 },
      { day:'Wednesday', high:29, low:21, condition:'Partly Cloudy', precipitation:20 }
    ],
    soil: { temperature:25, moisture:45, ph:6.8, nitrogen:42, phosphorus:28, potassium:35 },
    agriculture: { cropStage:'Flowering', irrigationNeeded:false, pestRisk:'Low', diseaseRisk:'Medium', harvestWindow:'15-20 days' }
  };

  constructor() {
    this.fetchWeather();
  }

  protected fetchWeather() {
    this.isLoading.set(true);
    setTimeout(()=>{
      this.weatherData.set(this.mockWeather);
      this.isLoading.set(false);
    }, 800);
  }

  protected onStateChange() { this.fetchWeather(); }

  protected conditionColor(cond: string) {
    if (cond.includes('Rain')) return 'text-info';
    if (cond.includes('Cloud')) return 'text-muted';
    return 'text-warning';
  }
  protected soilHealthColor(value: number, type: string) {
    if (type==='moisture') {
      if (value < 30) return 'text-danger';
      if (value < 60) return 'text-warning';
      return 'text-secondary';
    }
    if (type==='ph') {
      if (value < 6 || value > 8) return 'text-danger';
      if (value < 6.5 || value > 7.5) return 'text-warning';
      return 'text-secondary';
    }
    return 'text-secondary';
  }
}
