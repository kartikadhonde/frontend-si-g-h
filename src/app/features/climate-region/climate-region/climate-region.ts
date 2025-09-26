import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StateData {
  id: string;
  name: string;
  climate: string;
  avgTemp: string;
  rainfall: string;
  seasons: { kharif: string; rabi: string };
  majorCrops: string[];
  soilTypes: string[];
  challenges: string[];
  opportunities: string[];
}

interface CropRecommendation {
  crop: string;
  season: string;
  sowingTime: string;
  harvestTime: string;
  yield: string;
  suitability: string;
  notes: string;
}

interface ClimateAlert {
  type: string;
  title: string;
  description: string;
  severity: string;
}

@Component({
  selector: 'app-climate-region',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './climate-region.html',
  styleUrls: ['./climate-region.css']
})
export class ClimateRegion {
  protected selectedState = signal('punjab');
  protected selectedStateValue = this.selectedState();

  protected readonly states: StateData[] = [
    {
      id: 'punjab',
      name: 'Punjab',
      climate: 'Semi-arid to sub-humid',
      avgTemp: '5°C (winter) - 45°C (summer)',
      rainfall: '500-750 mm',
      seasons: { kharif: 'June - October', rabi: 'November - April' },
      majorCrops: ['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton'],
      soilTypes: ['Alluvial'],
      challenges: ['Water scarcity', 'Soil degradation', 'Pest resistance'],
      opportunities: ['Good irrigation', 'Market access', 'Technology adoption']
    },
    {
      id: 'maharashtra',
      name: 'Maharashtra',
      climate: 'Tropical monsoon (varies across regions)',
      avgTemp: '10°C - 42°C',
      rainfall: '400-3000 mm (regional variation)',
      seasons: { kharif: 'June - October', rabi: 'October - March' },
      majorCrops: ['Cotton', 'Sugarcane', 'Soybean', 'Onion', 'Pulses'],
      soilTypes: ['Black cotton', 'Lateritic (Konkan)', 'Alluvial'],
      challenges: ['Irregular rainfall', 'Climate variability', 'Water scarcity'],
      opportunities: ['Diverse agro-climates', 'Export potential', 'Technology adoption']
    }
  ];

  protected readonly cropRecommendations: Record<string, CropRecommendation[]> = {
    punjab: [
      {
        crop: 'Wheat',
        season: 'Rabi',
        sowingTime: 'November-December',
        harvestTime: 'April-May',
        yield: '40-50 quintals/hectare',
        suitability: 'Excellent',
        notes: 'Major crop, high yield potential with proper irrigation'
      },
      {
        crop: 'Rice',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '35-45 quintals/hectare',
        suitability: 'Good',
        notes: 'Requires adequate water supply, Basmati varieties preferred'
      },
      {
        crop: 'Cotton',
        season: 'Kharif',
        sowingTime: 'April-May',
        harvestTime: 'October-December',
        yield: '15-20 quintals/hectare',
        suitability: 'Good',
        notes: 'Bt cotton varieties, requires warm weather'
      }
    ],
    maharashtra: [
      {
        crop: 'Cotton',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'January-March',
        yield: '10-15 quintals/hectare',
        suitability: 'Excellent',
        notes: 'Black cotton soil ideal, major commercial crop'
      },
      {
        crop: 'Sugarcane',
        season: 'Year-round',
        sowingTime: 'January-March',
        harvestTime: 'November-March',
        yield: '700-900 quintals/hectare',
        suitability: 'Excellent',
        notes: 'High water requirement, good processing facilities'
      },
      {
        crop: 'Soybean',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '12-18 quintals/hectare',
        suitability: 'Good',
        notes: 'Oil crop, nitrogen fixation benefit'
      }
    ]
  };

  protected readonly climateAlerts: Record<string, ClimateAlert[]> = {
    punjab: [
      {
        type: 'warning',
        title: 'Water Table Declining',
        description: 'Groundwater levels dropping by 0.5m annually. Consider water-efficient crops.',
        severity: 'High'
      },
      {
        type: 'info',
        title: 'Optimal Wheat Sowing',
        description: 'November 15-30 is ideal for wheat sowing in current weather conditions.',
        severity: 'Medium'
      }
    ],
    maharashtra: [
      {
        type: 'alert',
        title: 'Drought Conditions',
        description: 'Below normal rainfall predicted. Focus on drought-resistant varieties.',
        severity: 'High'
      },
      {
        type: 'info',
        title: 'Cotton Market Price',
        description: 'Cotton prices expected to remain stable. Good time for planning.',
        severity: 'Low'
      }
    ]
  };

  protected selectedStateData = computed(() => this.states.find(s => s.id === this.selectedState()));

  protected suitabilityClass(s: string): string {
    const value = s.toLowerCase();
    if (value === 'excellent') return 'badge-secondary';
    if (value === 'good') return 'badge-primary';
    if (value === 'moderate') return 'badge-warning';
    return 'badge-soft';
  }

  protected alertContainer(type: string, severity: string): string {
    if (severity === 'High') return 'is-danger';
    if (severity === 'Medium') return 'is-warning';
    return 'is-info';
  }

}
