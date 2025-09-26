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

  protected readonly crops: CropItem[] = [
    { id:1,name:'Rice',category:'cereal',image:'🌾',season:'Kharif (June-Oct)',soilType:'Clay, loamy soil',climate:'Tropical, high humidity',fertilization:{npk:'120:60:40 kg/ha',organic:'5-10 tons FYM/ha',micronutrients:'Zinc, Iron'},waterRequirement:'1500-2000mm',temperature:'20-35°C' },
    { id:2,name:'Wheat',category:'cereal',image:'🌾',season:'Rabi (Nov-Apr)',soilType:'Well-drained loamy soil',climate:'Cool, dry weather',fertilization:{npk:'150:75:50 kg/ha',organic:'8-12 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'450-650mm',temperature:'15-25°C' },
    { id:3,name:'Maize',category:'cereal',image:'🌽',season:'Kharif & Rabi',soilType:'Well-drained fertile soil',climate:'Warm, adequate rainfall',fertilization:{npk:'180:90:60 kg/ha',organic:'10-15 tons FYM/ha',micronutrients:'Zinc, Manganese'},waterRequirement:'500-800mm',temperature:'21-30°C' },
    { id:4,name:'Bajra',category:'cereal',image:'🌾',season:'Kharif (June-Sept)',soilType:'Sandy, well-drained',climate:'Arid, semi-arid',fertilization:{npk:'80:40:20 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'400-600mm',temperature:'25-35°C' },
    { id:5,name:'Jowar',category:'cereal',image:'🌾',season:'Kharif & Rabi',soilType:'Black cotton soil',climate:'Semi-arid',fertilization:{npk:'100:50:25 kg/ha',organic:'6-10 tons FYM/ha',micronutrients:'Zinc, Iron'},waterRequirement:'450-650mm',temperature:'26-30°C' },
    { id:6,name:'Barley',category:'cereal',image:'🌾',season:'Rabi (Nov-Apr)',soilType:'Well-drained loamy',climate:'Cool, dry',fertilization:{npk:'60:30:30 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'450-650mm',temperature:'15-20°C' },
    { id:7,name:'Ragi',category:'cereal',image:'🌾',season:'Kharif (June-Oct)',soilType:'Red, sandy loam',climate:'Moderate rainfall',fertilization:{npk:'50:25:25 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Zinc, Iron'},waterRequirement:'500-750mm',temperature:'20-27°C' },
    { id:8,name:'Small millets',category:'cereal',image:'🌾',season:'Kharif',soilType:'Poor, marginal lands',climate:'Drought tolerant',fertilization:{npk:'40:20:20 kg/ha',organic:'4-6 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'300-500mm',temperature:'25-35°C' },
    { id:9,name:'Arhar/Tur',category:'pulses',image:'🫘',season:'Kharif (June-Nov)',soilType:'Well-drained loamy',climate:'Warm, moderate rainfall',fertilization:{npk:'25:50:25 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Boron, Molybdenum'},waterRequirement:'600-1000mm',temperature:'20-30°C' },
    { id:10,name:'Gram',category:'pulses',image:'🫘',season:'Rabi (Oct-Mar)',soilType:'Well-drained clay loam',climate:'Cool, dry',fertilization:{npk:'20:50:20 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Boron, Molybdenum'},waterRequirement:'300-400mm',temperature:'15-25°C' },
    { id:11,name:'Masoor',category:'pulses',image:'🫘',season:'Rabi (Oct-Mar)',soilType:'Loamy, clay loam',climate:'Cool, dry',fertilization:{npk:'20:40:20 kg/ha',organic:'4-6 tons FYM/ha',micronutrients:'Boron'},waterRequirement:'300-400mm',temperature:'15-25°C' },
    { id:12,name:'Moong(Green Gram)',category:'pulses',image:'🫘',season:'Kharif & Summer',soilType:'Well-drained sandy loam',climate:'Warm, moderate rainfall',fertilization:{npk:'15:35:15 kg/ha',organic:'4-6 tons FYM/ha',micronutrients:'Molybdenum'},waterRequirement:'350-400mm',temperature:'25-35°C' },
    { id:13,name:'Urad',category:'pulses',image:'🫘',season:'Kharif & Rabi',soilType:'Clay loam to clay',climate:'Warm, humid',fertilization:{npk:'20:40:20 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Molybdenum, Zinc'},waterRequirement:'600-900mm',temperature:'25-35°C' },
    { id:14,name:'Horse-gram',category:'pulses',image:'🫘',season:'Kharif & Rabi',soilType:'Red, sandy soils',climate:'Drought tolerant',fertilization:{npk:'25:50:25 kg/ha',organic:'4-6 tons FYM/ha',micronutrients:'Molybdenum'},waterRequirement:'300-500mm',temperature:'25-30°C' },
    { id:15,name:'Khesari',category:'pulses',image:'🫘',season:'Rabi',soilType:'Heavy clay, waterlogged',climate:'Cool, moist',fertilization:{npk:'20:40:20 kg/ha',organic:'4-6 tons FYM/ha',micronutrients:'Boron'},waterRequirement:'400-500mm',temperature:'15-25°C' },
    { id:16,name:'Groundnut',category:'oilseeds',image:'🥜',season:'Kharif & Rabi',soilType:'Sandy loam, red soil',climate:'Warm, moderate rainfall',fertilization:{npk:'25:50:75 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Calcium, Sulphur'},waterRequirement:'500-750mm',temperature:'20-30°C' },
    { id:17,name:'Soyabean',category:'oilseeds',image:'🫘',season:'Kharif (June-Oct)',soilType:'Well-drained loamy',climate:'Warm, humid',fertilization:{npk:'30:80:40 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Molybdenum, Zinc'},waterRequirement:'450-700mm',temperature:'20-30°C' },
    { id:18,name:'Rapeseed &Mustard',category:'oilseeds',image:'🌻',season:'Rabi (Oct-Mar)',soilType:'Well-drained loamy',climate:'Cool, dry winters',fertilization:{npk:'100:50:50 kg/ha',organic:'6-8 tons FYM/ha',micronutrients:'Sulphur, Boron'},waterRequirement:'300-400mm',temperature:'15-25°C' },
    { id:19,name:'Sunflower',category:'oilseeds',image:'🌻',season:'Kharif & Rabi',soilType:'Well-drained sandy loam',climate:'Warm, moderate rainfall',fertilization:{npk:'60:90:40 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Boron, Zinc'},waterRequirement:'400-600mm',temperature:'20-27°C' },
    { id:20,name:'Sesamum',category:'oilseeds',image:'🌾',season:'Kharif & Summer',soilType:'Well-drained sandy loam',climate:'Warm, dry',fertilization:{npk:'40:20:20 kg/ha',organic:'6-8 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'500-650mm',temperature:'25-30°C' },
    { id:21,name:'Niger seed',category:'oilseeds',image:'🌾',season:'Kharif',soilType:'Well-drained upland',climate:'Moderate rainfall',fertilization:{npk:'40:20:20 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Boron'},waterRequirement:'1000-1500mm',temperature:'20-30°C' },
    { id:22,name:'Linseed',category:'oilseeds',image:'🌾',season:'Rabi',soilType:'Well-drained loamy',climate:'Cool, dry',fertilization:{npk:'60:30:30 kg/ha',organic:'6-8 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'450-500mm',temperature:'15-25°C' },
    { id:23,name:'Castor seed',category:'oilseeds',image:'🌿',season:'Kharif & Rabi',soilType:'Well-drained red, black soil',climate:'Semi-arid',fertilization:{npk:'60:30:30 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'500-750mm',temperature:'20-26°C' },
    { id:24,name:'Safflower',category:'oilseeds',image:'🌻',season:'Rabi',soilType:'Well-drained black soil',climate:'Cool, dry',fertilization:{npk:'60:30:30 kg/ha',organic:'6-8 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'350-400mm',temperature:'15-25°C' },
    { id:25,name:'Cotton(lint)',category:'cash',image:'🌱',season:'Kharif (Apr-Oct)',soilType:'Black cotton soil',climate:'Hot, humid',fertilization:{npk:'150:75:75 kg/ha',organic:'10-12 tons FYM/ha',micronutrients:'Boron, Zinc'},waterRequirement:'700-1200mm',temperature:'21-35°C' },
    { id:26,name:'Sugarcane',category:'cash',image:'🎋',season:'Year-round',soilType:'Deep, fertile alluvial',climate:'Hot, humid',fertilization:{npk:'280:92:140 kg/ha',organic:'25-30 tons FYM/ha',micronutrients:'Zinc, Iron'},waterRequirement:'1500-2500mm',temperature:'20-26°C' },
    { id:27,name:'Jute',category:'cash',image:'🌿',season:'Kharif (Apr-July)',soilType:'Alluvial, clay loam',climate:'Hot, humid',fertilization:{npk:'60:30:30 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'1000-1500mm',temperature:'25-35°C' },
    { id:28,name:'Tobacco',category:'cash',image:'🍃',season:'Rabi & Summer',soilType:'Well-drained sandy loam',climate:'Warm, moderate rainfall',fertilization:{npk:'120:60:120 kg/ha',organic:'15-20 tons FYM/ha',micronutrients:'Potash, Magnesium'},waterRequirement:'600-1200mm',temperature:'20-30°C' },
    { id:29,name:'Onion',category:'vegetables',image:'🧅',season:'Rabi & Kharif',soilType:'Well-drained sandy loam',climate:'Cool, dry period for bulb',fertilization:{npk:'100:50:50 kg/ha',organic:'20-25 tons FYM/ha',micronutrients:'Sulphur'},waterRequirement:'600-700mm',temperature:'15-25°C' },
    { id:30,name:'Potato',category:'vegetables',image:'🥔',season:'Rabi (Oct-Feb)',soilType:'Well-drained sandy loam',climate:'Cool weather',fertilization:{npk:'180:80:100 kg/ha',organic:'25-30 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'400-500mm',temperature:'15-25°C' },
    { id:31,name:'Sweet potato',category:'vegetables',image:'🍠',season:'Kharif',soilType:'Well-drained sandy loam',climate:'Warm, humid',fertilization:{npk:'75:50:100 kg/ha',organic:'15-20 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'500-750mm',temperature:'20-30°C' },
    { id:32,name:'Tapioca',category:'vegetables',image:'🫚',season:'Year-round',soilType:'Well-drained sandy',climate:'Tropical',fertilization:{npk:'90:40:120 kg/ha',organic:'10-15 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'1000-1500mm',temperature:'25-29°C' },
    { id:33,name:'Banana',category:'vegetables',image:'🍌',season:'Year-round',soilType:'Deep, well-drained alluvial',climate:'Hot, humid',fertilization:{npk:'200:60:300 kg/ha',organic:'25-30 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'1200-2200mm',temperature:'26-30°C' },
    { id:34,name:'Turmeric',category:'spices',image:'🟡',season:'May-Jan',soilType:'Well-drained sandy loam',climate:'Tropical, high humidity',fertilization:{npk:'75:50:100 kg/ha',organic:'15-20 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'1000-1500mm',temperature:'20-35°C' },
    { id:35,name:'Dry chillies',category:'spices',image:'🌶️',season:'Kharif & Rabi',soilType:'Well-drained sandy loam',climate:'Warm, dry weather',fertilization:{npk:'100:50:50 kg/ha',organic:'15-20 tons FYM/ha',micronutrients:'Calcium, Boron'},waterRequirement:'600-1250mm',temperature:'20-25°C' },
    { id:36,name:'Black pepper',category:'spices',image:'⚫',season:'Year-round',soilType:'Well-drained red laterite',climate:'Hot, humid tropical',fertilization:{npk:'50:50:150 kg/ha',organic:'10-15 tons FYM/ha',micronutrients:'Zinc, Boron'},waterRequirement:'1250-2000mm',temperature:'23-32°C' },
    { id:37,name:'Cardamom',category:'spices',image:'💚',season:'Year-round',soilType:'Well-drained forest loam',climate:'Cool, humid',fertilization:{npk:'75:75:150 kg/ha',organic:'5-8 tons FYM/ha',micronutrients:'Magnesium'},waterRequirement:'1500-4000mm',temperature:'15-25°C' },
    { id:38,name:'Coriander',category:'spices',image:'🌿',season:'Rabi',soilType:'Well-drained loamy',climate:'Cool, dry',fertilization:{npk:'60:30:30 kg/ha',organic:'8-10 tons FYM/ha',micronutrients:'Iron, Zinc'},waterRequirement:'400-500mm',temperature:'15-25°C' },
    { id:39,name:'Garlic',category:'spices',image:'🧄',season:'Rabi',soilType:'Well-drained sandy loam',climate:'Cool, dry',fertilization:{npk:'100:50:50 kg/ha',organic:'20-25 tons FYM/ha',micronutrients:'Sulphur'},waterRequirement:'450-500mm',temperature:'15-20°C' },
    { id:40,name:'Ginger',category:'spices',image:'🫚',season:'Apr-Dec',soilType:'Well-drained sandy loam',climate:'Warm, humid',fertilization:{npk:'75:50:50 kg/ha',organic:'25-30 tons FYM/ha',micronutrients:'Zinc'},waterRequirement:'1500-3000mm',temperature:'25-30°C' },
    { id:41,name:'Coconut',category:'spices',image:'🥥',season:'Year-round',soilType:'Well-drained sandy',climate:'Tropical coastal',fertilization:{npk:'500g:320g:1200g per palm',organic:'50kg FYM per palm',micronutrients:'Boron, Zinc'},waterRequirement:'1500-2500mm',temperature:'27-32°C' },
    { id:42,name:'Arecanut',category:'spices',image:'🌰',season:'Year-round',soilType:'Deep, well-drained laterite',climate:'Hot, humid',fertilization:{npk:'100:40:140g per palm',organic:'12-15kg FYM per palm',micronutrients:'Magnesium'},waterRequirement:'2000-4500mm',temperature:'14-34°C' },
    { id:43,name:'Cashewnut',category:'spices',image:'🥜',season:'Year-round',soilType:'Well-drained red laterite',climate:'Tropical coastal',fertilization:{npk:'500:125:125g per tree',organic:'10-15kg FYM per tree',micronutrients:'Zinc, Boron'},waterRequirement:'2000mm',temperature:'20-35°C' }
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
