import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
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

  completedSteps: number[] = [];
  selectedIslandType: string = '';
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

  get totalSteps(): number {
    return this.steps.length;
  }

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  goToStep(step: number) {
    // Si el paso actual no está marcado como completado, agrégalo a la lista de completados
    if (!this.completedSteps.includes(this.currentStep) && this.currentStep < step) {
      this.completedSteps.push(this.currentStep);
    }

    if (step <= this.steps.length) {
      // Asegurar que no se repitan pasos innecesarios
      this.currentStep = step;
      return;
    }

    const moduleSteps = this.moduleSteps || 0;
    const finalStepIndex = 4 + moduleSteps + 1;

    // Agregar pasos dinámicos solo si aún no se han agregado
    if (step > this.steps.length && this.steps.length < finalStepIndex) {
      for (let i = 1; i <= moduleSteps; i++) {
        if (!this.steps.some((s) => s.title === `Módulo ${i}`)) {
          this.steps.push({ id: 4 + i, title: `Módulo ${i}` });
        }
      }

      // Asegurar que el paso "Final" solo se agregue después de los módulos
      if (!this.steps.some((s) => s.title === 'Final')) {
        this.steps.push({ id: finalStepIndex, title: 'Final' });
      }
    }

    this.currentStep = step;
  }


  selectIsla(tipo: string, size: string) {
    this.selectedOptions.isla = tipo;
    this.selectedOptions.size = size;

    // Asignar el tipo de isla seleccionado
    this.selectedIslandType = tipo;

    // Definir número de módulos permitidos según el tipo de isla
    if (tipo === 'Isla Gran Malvina') {
      this.moduleSteps = 2; // Solo 2 módulos
    } else if (tipo === 'Isla Trinidad') {
      this.moduleSteps = 3; // Hasta 3 módulos
    } else if (tipo === 'Isla Soledad') {
      this.moduleSteps = 1; // Solo 1 módulo
    } else {
      this.moduleSteps = 2; // Default
    }

    // Ir al siguiente paso
    this.goToStep(2);
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

  selectModule(module: string, step: number) {
    if (this.selectedOptions.modules) {
      this.selectedOptions.modules[step - 5] = module;
    }

    // Ir al siguiente módulo o al paso final
    if (step < 4 + this.moduleSteps) {
      this.goToStep(step + 1);
    } else {
      this.goToStep(4 + this.moduleSteps + 1); // Paso final
    }
  }


  generateFinalImagePath(): { countertop: string; modules: string[] } {
    const size = this.selectedOptions.size;
    const colorOption = this.colorOptions.find(
      (option) => option.name === this.selectedOptions.colorMesada
    );
    const moduleColor = this.selectedOptions.moduleColor;

    if (!size || !colorOption || !moduleColor || !this.selectedOptions.modules) {
      console.error('Faltan opciones para generar el mueble.');
      return { countertop: '', modules: [] };
    }

    // Determinar la orientación de la mesada
    let countertopImage: string;
    if (this.selectedOptions.orientation === 'left') {
      countertopImage = `../../assets/finalFrente/${colorOption.prefix}${size}FRENTE.png`;
    } else if (this.selectedOptions.orientation === 'right') {
      countertopImage = `../../assets/finalFrente/${colorOption.prefix}${size}FRENTEOpuesto.png`;
    } else {
      console.error('La orientación de la mesada no es válida.');
      countertopImage = ''; // Imagen vacía en caso de error
    }

    // Generar imágenes de módulos
    const modulesImages = this.selectedOptions.modules.map((module) => {
      // Quitar el prefijo duplicado y la extensión .png
      const moduleId = module.replace(`${moduleColor}`, '').replace('.png', '');
      return `../../assets/finalFrente/${moduleColor}${moduleId}FRENTE.png`;
    });

    return {
      countertop: countertopImage,
      modules: modulesImages,
    };
  }

  onIslandTypeSelected(islandType: string): void {
    this.selectedIslandType = islandType;
  }


  getIslandClass(): string {
    switch (this.selectedIslandType) {
      case 'Isla Soledad':
        return 'island-soledad';
      case 'Isla Victoria':
        return 'island-victoria';
      case 'Isla Gran Malvina':
      case 'Isla Trinidad': // Ambos comparten tamaño
        return 'island-gran-malvina-trinidad';
      default:
        return 'island-default';
    }
  }



}


