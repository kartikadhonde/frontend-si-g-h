import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ValueCard {
  icon: string; // placeholder name of icon – actual SVG/icon system to be integrated
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
  // Data migrated from React About.tsx
  protected readonly values: ValueCard[] = [
    {
      icon: 'leaf',
      title: 'Sustainability',
      description:
        'Promoting eco-friendly farming practices that protect our environment for future generations.'
    },
    {
      icon: 'bar-chart-3',
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI technology to transform traditional farming methods.'
    },
    {
      icon: 'globe',
      title: 'Accessibility',
      description:
        'Making advanced agricultural insights available to farmers of all scales and backgrounds.'
    },
    {
      icon: 'users',
      title: 'Community',
      description:
        'Building a connected farming community that shares knowledge and grows together.'
    }
  ];

  protected readonly team: TeamMember[] = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Technology Officer',
      expertise: 'Agricultural AI & Machine Learning',
      experience: '15+ years'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Agriculture',
      expertise: 'Crop Science & Agronomy',
      experience: '12+ years'
    },
    {
      name: 'Amit Patel',
      role: 'Data Science Lead',
      expertise: 'Predictive Analytics & IoT',
      experience: '10+ years'
    },
    {
      name: 'Dr. Sunita Verma',
      role: 'Research Director',
      expertise: 'Soil Science & Climate',
      experience: '18+ years'
    }
  ];

  protected readonly achievements: Achievement[] = [
    { number: '10,000+', label: 'Farmers Served' },
    { number: '94%', label: 'Prediction Accuracy' },
    { number: '47', label: 'Crop Types Analyzed' },
    { number: '15', label: 'States Covered' }
  ];

}
