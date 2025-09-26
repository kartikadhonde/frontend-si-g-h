import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  step: string;
  title: string;
  description: string;
  variant: 'info' | 'accent' | 'secondary' | 'primary';
  details: string[];
}

interface Technology {
  name: string;
  description: string;
  applications: string[];
}

interface Benefit {
  percentage: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.css']
})
export class HowItWorks {
  protected readonly steps: Step[] = [
    {
      step: '01',
      title: 'Data Collection',
      description:
        'We gather comprehensive data from multiple sources including weather stations, soil sensors, satellite imagery, and historical crop performance records.',
      variant: 'info',
      details: [
        'Real-time weather data from 1000+ stations',
        'Satellite imagery for crop monitoring',
        'Soil composition and moisture levels',
        'Historical yield and climate patterns'
      ]
    },
    {
      step: '02',
      title: 'AI Processing',
      description:
        'Our advanced machine learning algorithms analyze the collected data to identify patterns, correlations, and predictive indicators.',
      variant: 'accent',
      details: [
        'Deep learning neural networks',
        'Pattern recognition algorithms',
        'Correlation analysis between variables',
        'Continuous model improvement'
      ]
    },
    {
      step: '03',
      title: 'Prediction Generation',
      description:
        'The AI generates accurate yield predictions and provides personalized recommendations based on your specific farm conditions.',
      variant: 'secondary',
      details: [
        'Yield predictions with confidence levels',
        'Customized fertilization schedules',
        'Optimal planting and harvesting times',
        'Risk assessment and mitigation'
      ]
    },
    {
      step: '04',
      title: 'Actionable Insights',
      description:
        'You receive easy-to-understand recommendations that help you make informed decisions to optimize your farming operations.',
      variant: 'primary',
      details: [
        'Mobile-friendly dashboard',
        'SMS and WhatsApp alerts',
        'Detailed PDF reports',
        '24/7 expert support'
      ]
    }
  ];

  protected readonly technologies: Technology[] = [
    {
      name: 'Machine Learning',
      description: 'Advanced algorithms that learn from vast agricultural datasets',
      applications: ['Yield prediction', 'Disease detection', 'Crop optimization']
    },
    {
      name: 'Weather Intelligence',
      description: 'Real-time weather analysis and forecasting',
      applications: ['Rainfall prediction', 'Temperature monitoring', 'Climate analysis']
    },
    {
      name: 'Precision Agriculture',
      description: 'Site-specific farming recommendations',
      applications: ['Soil management', 'Fertilizer optimization', 'Water conservation']
    }
  ];

  protected readonly benefits: Benefit[] = [
    {
      percentage: '25-40%',
      title: 'Yield Increase',
      description: 'Average improvement in crop yields through optimized farming practices'
    },
    {
      percentage: '30%',
      title: 'Cost Reduction',
      description: 'Savings on fertilizers and resources through precise recommendations'
    },
    {
      percentage: '94%',
      title: 'Prediction Accuracy',
      description: 'High accuracy rate in our yield predictions across different crops'
    },
    {
      percentage: '60%',
      title: 'Time Savings',
      description: 'Reduced time spent on manual planning and decision-making'
    }
  ];

}
