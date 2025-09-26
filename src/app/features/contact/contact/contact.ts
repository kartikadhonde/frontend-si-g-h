import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface ContactInfo {
  icon: string;
  title: string;
  primary: string;
  secondary: string;
  description: string;
}

interface SupportChannel {
  name: string;
  value: string;
  variant: 'secondary' | 'info' | 'danger';
  action: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  protected readonly isLoading = signal(false);

  protected readonly contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      title: 'Phone Support',
      primary: '+91 1800-FARM-AI',
      secondary: '+91 1800-327-624',
      description: 'Available 24/7 for urgent farming queries'
    },
    {
      icon: 'mail',
      title: 'Email Support',
      primary: 'support@farmwise.ai',
      secondary: 'help@farmwise.ai',
      description: 'Response within 2-4 hours'
    },
    {
      icon: 'map-pin',
      title: 'Head Office',
      primary: 'Sector 5, Chandigarh',
      secondary: 'Punjab, India - 160036',
      description: 'Visit us during business hours'
    },
    {
      icon: 'clock',
      title: 'Business Hours',
      primary: 'Mon - Sat: 9:00 AM - 6:00 PM',
      secondary: 'Sunday: Emergency support only',
      description: 'All times in Indian Standard Time'
    }
  ];

  protected readonly supportChannels: SupportChannel[] = [
    {
      name: 'WhatsApp Support',
      value: '+91 98765-43210',
      variant: 'secondary',
      action: 'Chat Now'
    },
    {
      name: 'Telegram Channel',
      value: '@FarmWiseAI_Support',
      variant: 'info',
      action: 'Join Channel'
    },
    {
      name: 'Emergency Helpline',
      value: '1800-URGENT-FARM',
      variant: 'danger',
      action: 'Call Now'
    }
  ];

  protected form = this.fbNonInit;
  private get fbNonInit() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)]
      ],
      subject: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fbNonInit; // ensure after DI
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    setTimeout(() => {
      // Simulate success
      this.isLoading.set(false);
      this.form.reset();
      // TODO: integrate toast service if/when available
      alert('Message Sent Successfully');
    }, 1200);
  }

}
