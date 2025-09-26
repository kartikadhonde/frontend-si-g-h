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
    { id:1, name:'Arecanut', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/1/10/Areca_nut.jpg', season:'Year-round', soilType:'Laterite/loam', climate:'Tropical humid', fertilization:{npk:'100:40:140g/palm',organic:'FYM',micronutrients:'Mg'}, waterRequirement:'High', temperature:'20-34°C' },
    { id:2, name:'Arhar/Tur', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/6/6b/Pigeonpea_%28Cajanus_cajan%29.jpg', season:'Kharif', soilType:'Loamy, well-drained', climate:'Warm', fertilization:{npk:'25:50:25 kg/ha',organic:'FYM',micronutrients:'B, Mo'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:3, name:'Castor seed', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/3/36/Castor_beans.jpg', season:'Kharif/Rabi', soilType:'Well-drained', climate:'Semi-arid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low-moderate', temperature:'20-30°C' },
    { id:4, name:'Cotton(lint)', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/6/6f/Cotton_boll.jpg', season:'Kharif', soilType:'Black cotton/loam', climate:'Warm humid', fertilization:{npk:'150:75:75 kg/ha',organic:'FYM',micronutrients:'B,Zn'}, waterRequirement:'Moderate-high', temperature:'21-35°C' },
    { id:5, name:'Dry chillies', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dry_chilli.jpg', season:'Kharif/Rabi', soilType:'Sandy loam', climate:'Warm dry', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'Ca,B'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:6, name:'Gram', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/c/cb/Chana.JPG', season:'Rabi', soilType:'Loamy', climate:'Cool dry', fertilization:{npk:'20:50:20 kg/ha',organic:'FYM',micronutrients:'B,Mo'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:7, name:'Jute', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/0/07/Jute_field.jpg', season:'Kharif', soilType:'Alluvial', climate:'Hot humid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'25-35°C' },
    { id:8, name:'Linseed', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/7/73/Flax_in_field.jpg', season:'Rabi', soilType:'Loamy', climate:'Cool', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:9, name:'Maize', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/6/6c/Maize_field.jpg', season:'Kharif/Rabi', soilType:'Loamy', climate:'Warm', fertilization:{npk:'180:90:60 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate-high', temperature:'21-30°C' },
    { id:10, name:'Mesta', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/1/16/Mesta_flower.jpg', season:'Kharif', soilType:'Loamy', climate:'Warm humid', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Moderate', temperature:'22-30°C' },
    { id:11, name:'Niger seed', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/5/5d/Niger_seed_field.jpg', season:'Kharif', soilType:'Upland well-drained', climate:'Moderate', fertilization:{npk:'40:20:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:12, name:'Onion', category:'vegetables', image:'https://upload.wikimedia.org/wikipedia/commons/6/66/Onions.jpg', season:'Rabi/Kharif', soilType:'Sandy loam', climate:'Cool dry bulbing', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'S'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:13, name:'Other Rabi pulses', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/8/86/Pulses.jpg', season:'Rabi', soilType:'Loam', climate:'Cool dry', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:14, name:'Potato', category:'vegetables', image:'https://upload.wikimedia.org/wikipedia/commons/6/6f/Potatoes.jpg', season:'Rabi', soilType:'Sandy loam', climate:'Cool', fertilization:{npk:'180:80:100 kg/ha',organic:'FYM',micronutrients:'Zn,B'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:15, name:'Rapeseed &Mustard', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/7/71/Mustard_field.jpg', season:'Rabi', soilType:'Loam', climate:'Cool dry', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'S,B'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:16, name:'Rice', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/2/2f/Rice_field.jpg', season:'Kharif', soilType:'Clayey', climate:'Tropical humid', fertilization:{npk:'120:60:40 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'20-35°C' },
    { id:17, name:'Sesamum', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Sesame_field.jpg', season:'Kharif', soilType:'Sandy loam', climate:'Warm dry', fertilization:{npk:'40:20:20 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low-moderate', temperature:'25-30°C' },
    { id:18, name:'Small millets', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/5/5c/Millets.jpg', season:'Kharif', soilType:'Marginal soils', climate:'Drought tolerant', fertilization:{npk:'40:20:20 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low', temperature:'25-35°C' },
    { id:19, name:'Sugarcane', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/4/49/Sugarcane_field.jpg', season:'Year-round', soilType:'Deep alluvial', climate:'Hot humid', fertilization:{npk:'280:92:140 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'20-26°C' },
    { id:20, name:'Sweet potato', category:'vegetables', image:'https://upload.wikimedia.org/wikipedia/commons/9/98/Sweet_potato.jpg', season:'Kharif', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'75:50:100 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:21, name:'Tapioca', category:'vegetables', image:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Tapioca_roots.jpg', season:'Year-round', soilType:'Sandy', climate:'Tropical', fertilization:{npk:'90:40:120 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'25-29°C' },
    { id:22, name:'Tobacco', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/8/86/Tobacco_plants.jpg', season:'Rabi/Summer', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'120:60:120 kg/ha',organic:'FYM',micronutrients:'Mg'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:23, name:'Turmeric', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/1/11/Turmeric_roots.jpg', season:'May-Jan', soilType:'Sandy loam', climate:'Tropical humid', fertilization:{npk:'75:50:100 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'20-35°C' },
    { id:24, name:'Wheat', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/4/47/Wheat_field.jpg', season:'Rabi', soilType:'Loamy', climate:'Cool dry', fertilization:{npk:'150:75:50 kg/ha',organic:'FYM',micronutrients:'Zn,B'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:25, name:'Bajra', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/4/43/Pearl_millet.jpg', season:'Kharif', soilType:'Sandy, well-drained', climate:'Arid', fertilization:{npk:'80:40:20 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low-moderate', temperature:'25-35°C' },
    { id:26, name:'Black pepper', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/5/5b/Black_peppercorns_%28Piper_nigrum%29.jpg', season:'Year-round', soilType:'Laterite', climate:'Tropical humid', fertilization:{npk:'50:50:150 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'23-32°C' },
    { id:27, name:'Cardamom', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/6/66/Cardamom_pods.jpg', season:'Year-round', soilType:'Forest loam', climate:'Cool humid', fertilization:{npk:'75:75:150 kg/ha',organic:'FYM',micronutrients:'Mg'}, waterRequirement:'High', temperature:'15-25°C' },
    { id:28, name:'Coriander', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/5/57/Coriander_leaves_and_seeds.jpg', season:'Rabi', soilType:'Loam', climate:'Cool', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Fe,Zn'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:29, name:'Garlic', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/2/2f/Garlic.jpg', season:'Rabi', soilType:'Sandy loam', climate:'Cool dry', fertilization:{npk:'100:50:50 kg/ha',organic:'FYM',micronutrients:'S'}, waterRequirement:'Moderate', temperature:'15-20°C' },
    { id:30, name:'Ginger', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Ginger_root.jpg', season:'Apr-Dec', soilType:'Sandy loam', climate:'Warm humid', fertilization:{npk:'75:50:50 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'High', temperature:'25-30°C' },
    { id:31, name:'Groundnut', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/0/07/Peanut_in_shell.jpg', season:'Kharif/Rabi', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'25:50:75 kg/ha',organic:'FYM',micronutrients:'Ca,S'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:32, name:'Horse-gram', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/0/06/Zwingli_%28Horsegram%29.jpg', season:'Kharif/Rabi', soilType:'Sandy to red soils', climate:'Drought tolerant', fertilization:{npk:'25:50:25 kg/ha',organic:'FYM',micronutrients:'Mo'}, waterRequirement:'Low', temperature:'25-30°C' },
    { id:33, name:'Jowar', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/0/05/Sorghum_field.jpg', season:'Kharif/Rabi', soilType:'Black cotton', climate:'Semi-arid', fertilization:{npk:'100:50:25 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate', temperature:'26-30°C' },
    { id:34, name:'Ragi', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/7/71/Finger_millet.jpg', season:'Kharif', soilType:'Sandy loam', climate:'Moderate', fertilization:{npk:'50:25:25 kg/ha',organic:'FYM',micronutrients:'Zn,Fe'}, waterRequirement:'Low-moderate', temperature:'20-27°C' },
    { id:35, name:'Cashewnut', category:'spices', image:'https://upload.wikimedia.org/wikipedia/commons/4/4e/Cashew_nuts.JPG', season:'Year-round', soilType:'Laterite', climate:'Tropical coastal', fertilization:{npk:'N/A',organic:'FYM',micronutrients:'Zn,B'}, waterRequirement:'Moderate', temperature:'20-35°C' },
    { id:36, name:'Banana', category:'vegetables', image:'https://upload.wikimedia.org/wikipedia/commons/8/8f/Banana_tree.jpg', season:'Year-round', soilType:'Deep alluvial', climate:'Tropical humid', fertilization:{npk:'200:60:300 kg/ha',organic:'FYM',micronutrients:'Zn,B'}, waterRequirement:'High', temperature:'26-30°C' },
    { id:37, name:'Soyabean', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/8/80/Soybean_field.jpg', season:'Kharif', soilType:'Loamy', climate:'Warm humid', fertilization:{npk:'30:80:40 kg/ha',organic:'FYM',micronutrients:'Mo,Zn'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:38, name:'Barley', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/9/9a/Barley_field.jpg', season:'Rabi', soilType:'Loam', climate:'Cool dry', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Moderate', temperature:'15-20°C' },
    { id:39, name:'Khesari', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/4/4c/Lathyrus_sativus_%28Khesari%29.jpg', season:'Rabi', soilType:'Clay', climate:'Cool moist', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Moderate', temperature:'15-25°C' },
    { id:40, name:'Masoor', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Lentils.jpg', season:'Rabi', soilType:'Loamy', climate:'Cool', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:41, name:'Moong(Green Gram)', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/4/45/Green_gram.jpg', season:'Kharif/Summer', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'15:35:15 kg/ha',organic:'FYM',micronutrients:'Mo'}, waterRequirement:'Low-moderate', temperature:'25-35°C' },
    { id:42, name:'Other Kharif pulses', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/1/13/Kharif_pulses.jpg', season:'Kharif', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'25:50:25 kg/ha',organic:'FYM',micronutrients:'Mo'}, waterRequirement:'Moderate', temperature:'20-30°C' },
    { id:43, name:'Safflower', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/5/5d/Safflower_field.jpg', season:'Rabi', soilType:'Black soil', climate:'Cool dry', fertilization:{npk:'60:30:30 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Low-moderate', temperature:'15-25°C' },
    { id:44, name:'Sannhamp', category:'cash', image:'https://upload.wikimedia.org/wikipedia/commons/2/2b/Sunn_hemp_field.jpg', season:'Kharif/Summer', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'40:30:30 kg/ha',organic:'Green manure',micronutrients:'N-fixation'}, waterRequirement:'Moderate', temperature:'22-32°C' },
    { id:45, name:'Sunflower', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_field.jpg', season:'Kharif/Rabi', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'60:90:40 kg/ha',organic:'FYM',micronutrients:'B,Zn'}, waterRequirement:'Moderate', temperature:'20-27°C' },
    { id:46, name:'Urad', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/3/36/Urad.jpg', season:'Kharif/Rabi', soilType:'Clay loam', climate:'Warm humid', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'Mo,Zn'}, waterRequirement:'Moderate', temperature:'25-35°C' },
    { id:47, name:'Peas & beans (Pulses)', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/0/03/Peas_in_pod.jpg', season:'Rabi/Kharif', soilType:'Loamy', climate:'Cool-moderate', fertilization:{npk:'20:50:20 kg/ha',organic:'FYM',micronutrients:'B,Mo'}, waterRequirement:'Moderate', temperature:'10-25°C' },
    { id:48, name:'other oilseeds', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/8/89/Oilseeds.jpg', season:'Varies', soilType:'Loamy', climate:'Varies', fertilization:{npk:'40:20:20 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Varies', temperature:'Varies' },
    { id:49, name:'Other Cereals', category:'cereal', image:'https://upload.wikimedia.org/wikipedia/commons/6/6e/Cereals_on_field.jpg', season:'Varies', soilType:'Loam', climate:'Varies', fertilization:{npk:'50:30:20 kg/ha',organic:'FYM',micronutrients:'Zn'}, waterRequirement:'Varies', temperature:'Varies' },
    { id:50, name:'Cowpea(Lobia)', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/7/7a/Cowpea_pods.jpg', season:'Kharif/Summer', soilType:'Sandy loam', climate:'Warm drought tolerant', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Low-moderate', temperature:'20-30°C' },
    { id:51, name:'Oilseeds total', category:'oilseeds', image:'https://upload.wikimedia.org/wikipedia/commons/9/9b/Oilseed_field.jpg', season:'Varies', soilType:'Loam', climate:'Varies', fertilization:{npk:'Varies',organic:'FYM',micronutrients:'Varies'}, waterRequirement:'Varies', temperature:'Varies' },
    { id:52, name:'Guar seed', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/5/53/Guar_crop.jpg', season:'Kharif', soilType:'Sandy', climate:'Semi-arid', fertilization:{npk:'20:40:20 kg/ha',organic:'FYM',micronutrients:'B'}, waterRequirement:'Low', temperature:'25-35°C' },
    { id:53, name:'Other Summer Pulses', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/7/79/Summer_pulses.jpg', season:'Summer', soilType:'Sandy loam', climate:'Warm', fertilization:{npk:'15:35:15 kg/ha',organic:'FYM',micronutrients:'Mo'}, waterRequirement:'Low-moderate', temperature:'25-35°C' },
    { id:54, name:'Moth', category:'pulses', image:'https://upload.wikimedia.org/wikipedia/commons/2/22/Moth_bean.jpg', season:'Kharif/Summer', soilType:'Sandy/light', climate:'Drought tolerant', fertilization:{npk:'15:30:15 kg/ha',organic:'FYM',micronutrients:'Mo'}, waterRequirement:'Low', temperature:'25-35°C' }
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