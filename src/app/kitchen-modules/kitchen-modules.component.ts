import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-modules',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './kitchen-modules.component.html',
  styleUrls: ['./kitchen-modules.component.css'],
})
export class KitchenModulesComponent {
  activeTab: string = 'modulo_01';



  constructor(
      private router: Router
  ) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  // Navegar entre vistas
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
