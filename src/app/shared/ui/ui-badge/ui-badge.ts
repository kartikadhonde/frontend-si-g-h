import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-badge.html',
  styleUrls: ['./ui-badge.css']
})
export class UiBadge {
  @Input() variant: 'primary'|'secondary'|'soft'|'video'|'tool'|'research' = 'secondary';
  protected variantSignal = signal(this.variant);
  ngOnChanges(){ this.variantSignal.set(this.variant); }
  protected computedClasses = computed(() => {
    const v = this.variantSignal();
    if (v==='primary') return 'badge-primary';
    if (v==='secondary') return 'badge-secondary';
    if (v==='soft') return 'badge-soft';
    if (v==='video') return 'badge-video';
    if (v==='tool') return 'badge-tool';
    if (v==='research') return 'badge-research';
    return '';
  });
}
