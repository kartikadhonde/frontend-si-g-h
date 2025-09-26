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
    },
    {
      id: 'uttar-pradesh',
      name: 'Uttar Pradesh',
      climate: 'Subtropical (humid to semi-arid)',
      avgTemp: '3°C (winter) - 45°C (summer)',
      rainfall: '600-1000 mm',
      seasons: { kharif: 'June - October', rabi: 'November - March' },
      majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Pulses', 'Potato'],
      soilTypes: ['Alluvial', 'Loamy'],
      challenges: ['Flooding', 'Soil erosion', 'Pest pressure'],
      opportunities: ['Large irrigation network', 'High-yield varieties', 'Market access']
    },
    {
      id: 'madhya-pradesh',
      name: 'Madhya Pradesh',
      climate: 'Tropical wet and dry',
      avgTemp: '5°C - 44°C',
      rainfall: '800-1200 mm',
      seasons: { kharif: 'June - September', rabi: 'October - February' },
      majorCrops: ['Soybean', 'Wheat', 'Rice', 'Pulses', 'Maize'],
      soilTypes: ['Black cotton (Vertisols)', 'Alluvial'],
      challenges: ['Rainfall variability', 'Soil moisture stress'],
      opportunities: ['Oilseed hub', 'Mechanization', 'Diversification']
    },
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      climate: 'Tropical (coastal & inland)',
      avgTemp: '10°C - 42°C',
      rainfall: '700-1100 mm',
      seasons: { kharif: 'June - October', rabi: 'November - March' },
      majorCrops: ['Rice', 'Cotton', 'Groundnut', 'Chillies', 'Sugarcane'],
      soilTypes: ['Red sandy', 'Alluvial', 'Black soils'],
      challenges: ['Cyclones (coastal)', 'Salinity', 'Drought in Rayalaseema'],
      opportunities: ['Canal irrigation', 'Horticulture expansion', 'Agri-export potential']
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
    ,
    'uttar-pradesh': [
      {
        crop: 'Wheat',
        season: 'Rabi',
        sowingTime: 'November-December',
        harvestTime: 'March-April',
        yield: '35-45 quintals/hectare',
        suitability: 'Excellent',
        notes: 'Extensive irrigation enables high yields'
      },
      {
        crop: 'Rice',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '30-40 quintals/hectare',
        suitability: 'Good',
        notes: 'Flood-prone districts prefer flood-tolerant varieties'
      },
      {
        crop: 'Sugarcane',
        season: 'Year-round',
        sowingTime: 'February-March',
        harvestTime: 'November-March',
        yield: '600-800 quintals/hectare',
        suitability: 'Good',
        notes: 'Requires assured irrigation'
      }
    ],
    'madhya-pradesh': [
      {
        crop: 'Soybean',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '10-15 quintals/hectare',
        suitability: 'Excellent',
        notes: 'Leading soybean producer; prefers well-drained black soils'
      },
      {
        crop: 'Wheat',
        season: 'Rabi',
        sowingTime: 'November-December',
        harvestTime: 'March-April',
        yield: '30-40 quintals/hectare',
        suitability: 'Good',
        notes: 'Irrigated tracts perform best'
      },
      {
        crop: 'Pulses (Gram)',
        season: 'Rabi',
        sowingTime: 'October-November',
        harvestTime: 'February-March',
        yield: '8-12 quintals/hectare',
        suitability: 'Good',
        notes: 'Thrives in residual moisture'
      }
    ],
    'andhra-pradesh': [
      {
        crop: 'Rice',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '35-45 quintals/hectare',
        suitability: 'Excellent',
        notes: 'Canal irrigation in delta regions supports high yields'
      },
      {
        crop: 'Groundnut',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'October-November',
        yield: '8-12 quintals/hectare',
        suitability: 'Good',
        notes: 'Suitable for red sandy soils'
      },
      {
        crop: 'Cotton',
        season: 'Kharif',
        sowingTime: 'June-July',
        harvestTime: 'December-January',
        yield: '12-18 quintals/hectare',
        suitability: 'Good',
        notes: 'Warmer inland zones perform better'
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
    ],
    'uttar-pradesh': [
      {
        type: 'warning',
        title: 'River Flood Advisory',
        description: 'Monsoon floods possible in low-lying areas; consider flood-tolerant rice varieties.',
        severity: 'High'
      },
      {
        type: 'info',
        title: 'Wheat Sowing Window',
        description: 'Optimal wheat sowing between Nov 10-25 with current temperatures.',
        severity: 'Medium'
      }
    ],
    'madhya-pradesh': [
      {
        type: 'alert',
        title: 'Rainfall Variability',
        description: 'Irregular monsoon onset expected; adjust soybean sowing to moisture conditions.',
        severity: 'High'
      },
      {
        type: 'info',
        title: 'Gram Market Update',
        description: 'Stable demand for pulses expected; monitor local mandi prices.',
        severity: 'Low'
      }
    ],
    'andhra-pradesh': [
      {
        type: 'warning',
        title: 'Cyclone Watch',
        description: 'Coastal districts on alert for cyclonic activity; secure nurseries and inputs.',
        severity: 'High'
      },
      {
        type: 'info',
        title: 'Irrigation Advisory',
        description: 'Canal releases scheduled; plan rice transplanting accordingly in delta areas.',
        severity: 'Medium'
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
