import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


   @ViewChild('navbarLinks', { static: true }) navbarLinks!: ElementRef;

  constructor(private renderer: Renderer2,
    private router: Router
  ) {}

  toggleMenu() {
    const displayStyle = this.navbarLinks.nativeElement.style.display;
    if (displayStyle === 'flex') {
      this.renderer.setStyle(this.navbarLinks.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.navbarLinks.nativeElement, 'display', 'flex');
      this.renderer.addClass(this.navbarLinks.nativeElement, 'responsive');
    }
  }

    // Navegar entre vistas
    navigateTo(route: string) {
      this.router.navigate([`/${route}`]);
    }
}
