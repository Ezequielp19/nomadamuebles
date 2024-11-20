import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MueblesComponent } from '../muebles/muebles.component';
import { Muebles2Component } from '../muebles2/muebles2.component';
import { Muebles3Component } from "../muebles3/muebles3.component";
import { VideoComponent } from "../video/video.component";
import { KitchenModulesComponent } from "../kitchen-modules/kitchen-modules.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroSectionComponent,
    MueblesComponent, Muebles2Component, Muebles3Component, VideoComponent,
    KitchenModulesComponent, FooterComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
