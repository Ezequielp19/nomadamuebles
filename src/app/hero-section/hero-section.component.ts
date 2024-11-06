import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';

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
    '../../assets/carru5.jpeg',
    '../../assets/carru6.jpeg',
    '../../assets/carru7.jpeg',
    '../../assets/carru4.jpeg',
  ];

   currentIndex = 0;

  moveSlide(direction: number) {
    const totalImages = this.images.length;
    this.currentIndex = (this.currentIndex + direction + totalImages) % totalImages;

    const carouselTrack = document.querySelector(".carousel-track") as HTMLElement;
    const offset = -this.currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }
}
