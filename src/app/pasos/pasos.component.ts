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
  orientations: ('left' | 'right')[] = ['left', 'right'];
  steps: { id: number; title: string }[] = [];
  selectedOptions: {
    isla?: string;
    colorMesada?: string;
    orientation?: 'left' | 'right';
    size?: string;
    moduleColor?: string;
    modules?: string[];
  } = { modules: [] };

  moduleSteps: number = 0; // Número de módulos según la isla seleccionada
  moduleOptions: string[] = []; // Opciones de módulos según el color
  availableModules = ['01', '02', '03', '04', '05', '06', '07'];


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

  moduleColorOptions = [
    { name: 'Blanco Liso', prefix: 'B', imagePath: '../../assets/colorModulos/BlancoL.jpg' },
    { name: 'Verde Safari', prefix: 'S', imagePath: '../../assets/colorModulos/VerdeS.jpg' },
  ];


  orientationImages: Record<string, string> = {
    left: '../../assets/sentidoMedida/left.png',
    right: '../../assets/sentidoMedida/right.png',
  };

  constructor() {
    this.initializeSteps();
  }

  initializeSteps() {
    this.steps = [
      { id: 1, title: 'Tipo de isla' },
      { id: 2, title: 'Color de la mesada' },
      { id: 3, title: 'Medida y orientación de la mesada' },
      { id: 4, title: 'Color módulo' },
    ];
  }

  goToStep(step: number) {
    if (step > this.steps.length) {
      // Agregar pasos dinámicamente según los módulos seleccionados
      const moduleSteps = this.selectedOptions.modules?.length || 0;
      for (let i = 1; i <= moduleSteps; i++) {
        this.steps.push({ id: 4 + i, title: `Módulo ${i}` });
      }
      this.steps.push({ id: 4 + moduleSteps + 1, title: 'Final' });
    }
    this.currentStep = step;
  }

  // Handle island type selection
  selectIsla(tipo: string, size: string) {
    this.selectedOptions.isla = tipo;
    this.selectedOptions.size = size; // Assign the size of the island
    this.moduleSteps = size === '57' ? 1 : size === '107' ? 2 : 3;
    this.goToStep(2); // Move to the next step
  }

 // Handle countertop color selection
 selectColor(color: string, prefix: string) {
  this.selectedOptions.colorMesada = color;

  // Generate image paths for the orientations based on selected size and prefix
  const size = this.selectedOptions.size;
  if (size) {
    this.orientationImages = {
      left: `../../assets/sentidoMedida/${prefix}${size}.png`,
      right: `../../assets/sentidoMedida/${prefix}${size}Opuesto.png`,
    };
  }

  this.goToStep(3); // Move to the next step
}

selectOrientation(orientation: 'left' | 'right') {
  this.selectedOptions.orientation = orientation;
  this.goToStep(4); // Proceed to the next step
}


  // Seleccionar color de módulo
  selectModuleColor(color: string) {
    const selectedColor = this.moduleColorOptions.find((option) => option.name === color);
    if (selectedColor) {
      this.selectedOptions.moduleColor = selectedColor.prefix;
      this.moduleOptions = this.availableModules.map(
        (module) => `${selectedColor.prefix}${module}.png`
      );
    }
    this.goToStep(5);
  }

   // Seleccionar módulo
   selectModule(module: string, step: number) {
    if (this.selectedOptions.modules) {
      this.selectedOptions.modules[step - 5] = module;
    }
    if (step < 4 + this.moduleSteps) {
      this.goToStep(step + 1);
    } else {
      this.goToStep(4 + this.moduleSteps + 1);
    }
  }

}


