import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [],
  templateUrl: './ui-button.html',
  styleUrls: ['./ui-button.css']
})
export class UiButton { @Input() variant: 'primary'|'secondary'|'outline'|'default' = 'default'; }
