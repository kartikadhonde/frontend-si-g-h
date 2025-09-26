import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category { id: string; name: string; count: number; }
interface ResourceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  duration: string;
  author: string;
  date: string;
  downloads: number;
  tags: string[];
  featured: boolean;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resources.html',
  styleUrls: ['./resources.css']
})
export class Resources {
  protected searchTerm = signal('');
  protected selectedCategory = signal('all');

  protected readonly categories: Category[] = [
    { id: 'all', name: 'All Resources', count: 45 },
    { id: 'guides', name: 'Farming Guides', count: 18 },
    { id: 'videos', name: 'Video Tutorials', count: 12 },
    { id: 'research', name: 'Research Papers', count: 8 },
    { id: 'tools', name: 'Tools & Calculators', count: 7 }
  ];

  protected readonly resources: ResourceItem[] = [
    {
      id: 1,
      title: 'Complete Guide to Wheat Cultivation in North India',
      description: 'Comprehensive guide covering everything from soil preparation to harvesting for optimal wheat yields.',
      category: 'guides',
      type: 'PDF Guide',
      duration: '45 min read',
      author: 'Dr. Rajesh Kumar',
      date: '2024-09-20',
      downloads: 2847,
      tags: ['wheat', 'cultivation', 'north-india', 'rabi-crops'],
      featured: true
    },
    {
      id: 2,
      title: 'Rice Pest Management: Identification and Treatment',
      description: 'Visual guide to identifying common rice pests and diseases with organic treatment methods.',
      category: 'guides',
      type: 'Interactive Guide',
      duration: '30 min read',
      author: 'Priya Sharma',
      date: '2024-09-18',
      downloads: 1923,
      tags: ['rice', 'pest-management', 'organic', 'kharif-crops'],
      featured: false
    },
    {
      id: 3,
      title: 'Smart Irrigation Techniques for Water Conservation',
      description: 'Learn modern irrigation methods that save water while maximizing crop yields.',
      category: 'videos',
      type: 'Video Tutorial',
      duration: '28 minutes',
      author: 'Amit Patel',
      date: '2024-09-15',
      downloads: 3421,
      tags: ['irrigation', 'water-conservation', 'smart-farming'],
      featured: true
    },
    {
      id: 4,
      title: 'Soil Health Assessment Calculator',
      description: 'Interactive tool to assess your soil health and get customized improvement recommendations.',
      category: 'tools',
      type: 'Web Tool',
      duration: '5 min',
      author: 'FarmWise AI Team',
      date: '2024-09-12',
      downloads: 1567,
      tags: ['soil-health', 'calculator', 'assessment'],
      featured: false
    },
    {
      id: 5,
      title: 'Climate Change Impact on Indian Agriculture',
      description: 'Research study analyzing the effects of climate change on crop yields across different regions.',
      category: 'research',
      type: 'Research Paper',
      duration: '60 min read',
      author: 'Dr. Sunita Verma',
      date: '2024-09-10',
      downloads: 892,
      tags: ['climate-change', 'research', 'sustainability'],
      featured: false
    },
    {
      id: 6,
      title: 'Organic Farming Transition Guide',
      description: 'Step-by-step guide to transitioning from conventional to organic farming methods.',
      category: 'guides',
      type: 'PDF Guide',
      duration: '40 min read',
      author: 'Organic India Team',
      date: '2024-09-08',
      downloads: 2156,
      tags: ['organic-farming', 'transition', 'sustainable'],
      featured: true
    },
    {
      id: 7,
      title: 'Fertilizer Application Timing for Maximum Efficiency',
      description: 'Video series on optimal timing and methods for fertilizer application across different crops.',
      category: 'videos',
      type: 'Video Series',
      duration: '45 minutes',
      author: 'Agricultural Extension',
      date: '2024-09-05',
      downloads: 2734,
      tags: ['fertilizer', 'timing', 'efficiency'],
      featured: false
    },
    {
      id: 8,
      title: 'Crop Rotation Planning Tool',
      description: 'Interactive planner to optimize crop rotation for improved soil health and yields.',
      category: 'tools',
      type: 'Planning Tool',
      duration: '10 min',
      author: 'FarmWise AI Team',
      date: '2024-09-03',
      downloads: 1234,
      tags: ['crop-rotation', 'planning', 'soil-health'],
      featured: false
    }
  ];

  protected readonly filteredResources = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const cat = this.selectedCategory();
    return this.resources.filter(r => {
      const matchesSearch = !term ||
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.tags.some(t => t.toLowerCase().includes(term));
      const matchesCategory = cat === 'all' || r.category === cat;
      return matchesSearch && matchesCategory;
    });
  });

  protected setCategory(id: string) { this.selectedCategory.set(id); }
  protected clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
  }

  protected getTypeIcon(type: string): string {
    if (type.includes('Video')) return '▶️';
    if (type.includes('Tool')) return '🛠️';
    if (type.includes('Research')) return '📄';
    return '📘';
  }
  protected getTypeColor(type: string): string {
    if (type.includes('Video')) return 'badge badge-video';
    if (type.includes('Tool')) return 'badge badge-tool';
    if (type.includes('Research')) return 'badge badge-research';
    return 'badge badge-secondary';
  }

  protected selectedCategoryName(): string {
    if (this.selectedCategory() === 'all') return 'All Resources';
    const found = this.categories.find(c => c.id === this.selectedCategory());
    return found?.name || 'Resources';
  }

}
