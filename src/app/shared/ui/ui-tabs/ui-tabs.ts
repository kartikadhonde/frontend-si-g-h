import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tabs.html',
  styleUrls: ['./ui-tabs.css']
})
export class UiTabs {
  tabs = [
    { label: 'Overview', content: 'Overview content' },
    { label: 'Details', content: 'Details content' },
    { label: 'More', content: 'More content' }
  ];
  activeIndex = 0;
  select(i:number){ this.activeIndex = i; }
}
