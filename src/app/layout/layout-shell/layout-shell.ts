import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css'
})
export class LayoutShell {

}
