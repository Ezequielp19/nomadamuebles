import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { MueblesComponent } from './muebles/muebles.component';
import { Muebles2Component } from './muebles2/muebles2.component';
import { Muebles3Component } from "./muebles3/muebles3.component";
import { VideoComponent } from "./video/video.component";
import { KitchenModulesComponent } from "./kitchen-modules/kitchen-modules.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroSectionComponent, MueblesComponent, Muebles2Component, Muebles3Component, VideoComponent, KitchenModulesComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nomadamuebles';
}
