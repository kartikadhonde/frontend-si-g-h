import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ui-select.html',
  styleUrls: ['./ui-select.css']
})
export class UiSelect {
  @Input() label?: string;
  @Input() options: { label: string; value: any }[] = [];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
}
