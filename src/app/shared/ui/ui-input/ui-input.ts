import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ui-input.html',
  styleUrls: ['./ui-input.css']
})
export class UiInput {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() value: any;
  @Input() error?: string;
  @Output() valueChange = new EventEmitter<any>();
}
