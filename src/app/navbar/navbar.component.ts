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
    const navbarLinks = this.navbarLinks.nativeElement;
    if (navbarLinks.classList.contains('responsive')) {
      this.renderer.removeClass(navbarLinks, 'responsive');
    } else {
      this.renderer.addClass(navbarLinks, 'responsive');
    }
  }



    // Navegar entre vistas
    navigateTo(route: string) {
      this.router.navigate([`/${route}`]);
    }
}
