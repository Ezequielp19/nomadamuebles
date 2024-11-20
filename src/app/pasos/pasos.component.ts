import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css'],
})
export class PasosComponent {
  currentStep: number = 1;
  selectedIsla: string | null = null; // Tipo de isla seleccionada
  selectedColor: string | null = null; // Color de mesada seleccionado

  // Data for each step
  steps = [
    { id: 1, title: 'Tipo de isla' },
    { id: 2, title: 'Color de la mesada' },
    { id: 3, title: 'Medida y orientación de la mesada' },
    { id: 4, title: 'Color módulo' },
    { id: 5, title: 'Módulo 1' },
    { id: 6, title: 'Módulo 2' },
    { id: 7, title: 'Módulo 3' },
    { id: 8, title: 'Final' },
  ];

  // List of available island types
  tipoIslaOptions = [
    { name: 'Isla Soledad', size: '57', imagePath: '../../assets/tipoIsla/1modulo.png' },
    { name: 'Isla Victoria', size: '107', imagePath: '../../assets/tipoIsla/2modulos.png' },
    { name: 'Isla Gran Malvina', size: '157', imagePath: '../../assets/tipoIsla/2modulos2.png' },
    { name: 'Isla Trinidad', size: '157', imagePath: '../../assets/tipoIsla/3modulos.png' },
  ];

  // List of available countertop colors
  colorOptions = [
    { name: 'Blanco Nature', prefix: 'BN', imagePath: '../../assets/colorMesadas/BlancoN.jpg' },
    { name: 'Negro Sauco', prefix: 'SA', imagePath: '../../assets/colorMesadas/NegroS.jpg' },
    { name: 'Roble Kendall Natural', prefix: 'K', imagePath: '../../assets/colorMesadas/RobleK.webp' },
  ];

  // Images for orientations based on selected island and color
  orientationImages: { left: string; right: string } | null = null;

  // Handle step navigation
  goToStep(step: number) {
    this.currentStep = step;
  }

  // Handle island type selection
  selectIsla(tipo: string, size: string) {
    this.selectedIsla = tipo;
    this.orientationImages = null; // Reset orientation images
    this.goToStep(2); // Move to the next step
  }

  // Handle countertop color selection
  selectColor(color: string, prefix: string) {
    this.selectedColor = color;
    const selectedIsland = this.tipoIslaOptions.find((isla) => isla.name === this.selectedIsla);

    if (selectedIsland) {
      // Generate paths for both orientations
      const size = selectedIsland.size;
      this.orientationImages = {
        left: `../../assets/sentidoMedida/${prefix}${size}.png`,
        right: `../../assets/sentidoMedida/${prefix}${size}Opuesto.png`,
      };
    }

    this.goToStep(3); // Move to the next step
  }
}
