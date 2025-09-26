import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { About } from './features/about/about/about';
import { Contact } from './features/contact/contact/contact';
import { ClimateRegion } from './features/climate-region/climate-region/climate-region';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { CropGuideComponent } from './features/crop-guide/crop-guide/crop-guide';
import { WeatherHubComponent } from './features/weather-hub/weather-hub/weather-hub';
import { NotFound } from './features/not-found/not-found/not-found';
import { Landing } from './features/landing/landing/landing';

export const routes: Routes = [
	{
		path: '',
		component: LayoutShell,
		children: [
			{ path: '', component: Dashboard },
			{ path: 'about', component: About },
			{ path: 'contact', component: Contact },
			{ path: 'climate-region', component: ClimateRegion },
			{ path: 'dashboard', component: Dashboard },
			{ path: 'crop-guide', component: CropGuideComponent },
			{ path: 'weather-hub', component: WeatherHubComponent },
		]
	},
	{ path: '404', component: NotFound },
	{ path: '**', redirectTo: '404' }
];
