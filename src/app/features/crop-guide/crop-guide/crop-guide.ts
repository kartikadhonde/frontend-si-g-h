import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CropCategory { id: string; name: string; }
interface CropItem {
  id: number; name: string; category: string; image: string; season: string; soilType: string; climate: string;
  fertilization: { npk: string; organic: string; micronutrients: string }; waterRequirement: string; temperature: string;
}

@Component({
  selector: 'app-crop-guide',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crop-guide.html',
  styleUrls: ['./crop-guide.css']
})
export class CropGuideComponent {
  protected searchTerm = signal('');
  protected selectedCategory = signal('all');

  protected readonly categories: CropCategory[] = [
    { id: 'all', name: 'All Crops' },
    { id: 'cereal', name: 'Cereal Crops' },
    { id: 'pulses', name: 'Pulses' },
    { id: 'oilseeds', name: 'Oilseeds' },
    { id: 'cash', name: 'Cash Crops' },
    { id: 'vegetables', name: 'Vegetables & Fruits' },
    { id: 'spices', name: 'Spices & Plantation' }
  ];

  // ...existing code...
  protected readonly crops: CropItem[] = [
    { id:1, name:'Arecanut', category:'spices', image:'arecanut.webp', season:'Year-round', soilType:'Laterite/loam', climate:'Tropical humid', fertilization:{npk:'100:40:140g/palm',organic:'FYM',micronutrients:'Mg'}, waterRequirement:'High', temperature:'20-34°C' },
    { id:2, name:'Arhar/Tur', category:'pulses', image:'ArharTur.webp', season:'Kharif', soilType:'Loamy, well-drained', climate:'Warm', fertilization:{npk:'25:50:25 kg/ha',organic:'FYM',micronutrients:'B, Mo'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:3, name:'Castor seed', category:'oilseeds', image:'Castor seed.webp', season:'Kharif/Rabi', soilType:'Well-drained', climate:'Semi-arid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low-moderate', temperature:'20-30°C' },
    { id:4, name:'Cotton(lint)', category:'cash', image:'Cotton(lint).webp', season:'Kharif', soilType:'Black cotton/loam', climate:'Warm humid', fertilization:{npk:'150:75:75 kg/ha',organic:'FYM',micronutrients:'B,Zn'}, waterRequirement:'Moderate-high', temperature:'21-35°C' },
    { id:5, name:'Dry chillies', category:'spices', image:'Dry chillies.webp', season:'Kharif/Rabi', soilType:'Sandy loam', climate:'Warm dry', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'Ca,B'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:6, name:'Gram', category:'pulses', image:'Gram.webp', season:'Rabi', soilType:'Loamy', climate:'Cool dry', fertilization:{npk:'20:50:20 kg/ha',organic:'FYM',micronutrients:'B,Mo'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:7, name:'Jute', category:'cash', image:'Jute.webp', season:'Kharif', soilType:'Alluvial', climate:'Hot humid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'25-35°C' },
    { id:8, name:'Linseed', category:'oilseeds', image:'Linseed.webp', season:'Rabi', soilType:'Loamy', climate:'Cool', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:9, name:'Maize', category:'cereal', image:'Maize.webp', season:'Kharif/Rabi', soilType:'Loamy', climate:'Warm', fertilization:{npk:'180:90:60 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate-high', temperature:'21-30°C' },
    { id:10, name:'Mesta', category:'cash', image:'Mesta.webp', season:'Kharif', soilType:'Loamy', climate:'Warm humid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Moderate', temperature:'22-30°C' },
    { id:11, name:'Niger seed', category:'oilseeds', image:'Niger seed.webp', season:'Kharif', soilType:'Upland well-drained', climate:'Moderate', fertilization:{npk:'40:20:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:12, name:'Onion', category:'vegetables', image:'Onion.webp', season:'Rabi/Kharif', soilType:'Sandy loam', climate:'Cool dry bulbing', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'S'}, waterRequirement:'Moderate', temperature:'15-25°C' }
  ];

  protected filteredCrops = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const cat = this.selectedCategory();
    return this.crops.filter(c => (
      c.name.toLowerCase().includes(term) && (cat === 'all' || c.category === cat)
    ));
  });

  private categoryNameMap: Record<string, string> = this.categories.reduce((acc, c) => { acc[c.id] = c.name; return acc; }, {} as Record<string,string>);
  protected categoryName(id: string): string { return this.categoryNameMap[id] || ''; }
}