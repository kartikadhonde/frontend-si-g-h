import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  experience: string;
}

interface Achievement {
  number: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  // Technical implementation features
  protected readonly values: ValueCard[] = [
    {
      icon: 'ML',
      title: 'Machine Learning',
      description:
        'XGBoost regression models trained on historical agricultural data with 2000 estimators and early stopping.'
    },
    {
      icon: 'DATA',
      title: 'Data Processing',
      description: 'Advanced preprocessing with target encoding for 54 crops and 30 regions, plus one-hot encoding for 6 seasons.'
    },
    {
      icon: 'API',
      title: 'Real-time Integration',
      description:
        'Seamless integration with weather APIs and soil health metrics for accurate predictions.'
    },
    {
      icon: 'LANG',
      title: 'Regional Support',
      description:
        'Multi-language interface supporting regional languages for accessibility across India.'
    }
  ];

  protected readonly team: TeamMember[] = [
    {
      name: 'Shlok Doshi',
      role: 'Full Stack',
      expertise: 'Flutter & Machine Learning Integration',
      experience: 'Hackathon Project'
    },
    {
      name: 'Samar Kamat',
      role: 'Machine Learning',
      expertise: 'XGBoost & Agricultural Data Analysis',
      experience: 'Hackathon Project'
    },
    {
      name: 'Aranck Jomraj & Moksh Jain',
      role: 'Backend',
      expertise: 'Server-Side Logic & API Integration, System Design',
      experience: 'Hackathon Project'
    },
    {
      name: 'Kartika Dhonde & Sharon David',
      role: 'Frontend Developer',
      expertise: 'Regional Language Support & Accessibility',
      experience: 'Hackathon Project'
    }
  ];

  protected readonly achievements: Achievement[] = [
    { number: '54', label: 'Crop Types Supported' },
    { number: '30', label: 'States Covered' },
    { number: '6', label: 'Seasons Analyzed' },
    { number: '10%+', label: 'Productivity Increase Target' }
  ];

  protected getKeyFeature(title: string): string {
    switch (title) {
      case 'Machine Learning': return 'XGBoost Regression';
      case 'Data Processing': return 'Target Encoding';
      case 'Real-time Integration': return 'Weather APIs';
      case 'Regional Support': return 'Multi-language UI';
      default: return 'Advanced Technology';
    }
  }

  protected getAchievementDescription(label: string): string {
    switch (label) {
      case 'Crop Types Supported': return 'Comprehensive agricultural coverage';
      case 'States Covered': return 'Pan-India agricultural intelligence';
      case 'Seasons Analyzed': return 'Year-round farming insights';
      case 'Productivity Increase Target': return 'Measurable impact goal';
      default: return 'Performance metric';
    }
  }

}