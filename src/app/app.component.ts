import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { MueblesComponent } from './muebles/muebles.component';
import { Muebles2Component } from './muebles2/muebles2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroSectionComponent, MueblesComponent, Muebles2Component ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nomadamuebles';
}
