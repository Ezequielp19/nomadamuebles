import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  images = [
    '../../assets/carru1.png',
    '../../assets/carru2.png',
    '../../assets/carru3.png',
  ];

   currentIndex = 0;
  constructor(
    private router: Router
  ) {}

  moveSlide(direction: number) {
    const totalImages = this.images.length;
    this.currentIndex = (this.currentIndex + direction + totalImages) % totalImages;

    const carouselTrack = document.querySelector(".carousel-track") as HTMLElement;
    const offset = -this.currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

    // Navegar entre vistas
    navigateTo(route: string) {
      this.router.navigate([`/${route}`]);
    }
}
