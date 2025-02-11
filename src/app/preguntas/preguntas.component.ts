import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, FooterComponent],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css'
})
export class PreguntasComponent {
  backgroundImage = 'url("../../assets/TRAMAS_1.png")';

    // Marca la sección 'muebles' como abierta por defecto
    openSections: { [key: string]: boolean } = {
      muebles: true, // La sección 'muebles' estará abierta por defecto
    };

  toggleSection(section: string): void {
    this.openSections[section] = !this.openSections[section];
  }

  isSectionOpen(section: string): boolean {
    return !!this.openSections[section];
  }
}
