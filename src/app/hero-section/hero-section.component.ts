import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
export class HeroSectionComponent implements OnInit, OnDestroy {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  images = [
    '../../assets/carru1.webp',
    '../../assets/carru2.webp',
    '../../assets/carru3.webp',
    '../../assets/carru4.webp',
  ];
  currentIndex = 0;
  private autoSlideInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  moveSlide(direction: number): void {
    const totalImages = this.images.length;
    this.currentIndex = (this.currentIndex + direction + totalImages) % totalImages;

    const carouselTrack = this.carouselTrack.nativeElement as HTMLElement;
    const offset = -this.currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.moveSlide(1); // Mover al siguiente slide
    }, 4000); // Cambiar cada 4 segundos
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Navegar entre vistas
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
