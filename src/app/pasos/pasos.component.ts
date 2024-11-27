import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule],
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
  searchCode: string = '';
  isSearchActive: boolean = false;
  completedSteps: number[] = [];
  selectedIslandType: string = '';
  warningMessage: string = ''; // Mensaje de advertencia
  codigoFinal: string = '';
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
    const size = this.selectedOptions.size; // Tamaño seleccionado (e.g., '175', '105', '57', '107')
    const orientation = this.selectedOptions.orientation; // Orientación seleccionada ('left' o 'right')
    const islandType = this.selectedIslandType; // Tipo de isla seleccionada (e.g., 'Gran Malvina')
    console.log(islandType)
    if (!size || !orientation) {
      console.error('Faltan opciones para determinar la clase de la mesada.');
      return 'module-wrapper-default'; // Clase por defecto si faltan opciones
    }

    // Determinar la clase base según el tipo de isla
    let className = `module-wrapper-${size}`;

  // Añadir orientación al final de la clase
  className += orientation === 'left' ? 'L' : 'R';

    // Manejo especial para la Isla "Gran Malvina" con medida 107 y 2 módulos
    if (islandType === 'Isla Gran Malvina' && size === '157') {
      className += '2M';
    }


    console.log(className)
    return className;
  }

  resetSelections(): void {
    // Limpia las selecciones
    this.searchCode = '';
    this.isSearchActive = false; // Restablecer el estado de la búsqueda al limpiar
    this.selectedOptions = { modules: [] };
    this.selectedIslandType = '';
    this.moduleSteps = 0;
    this.completedSteps = [];

    // Reinicia al paso inicial
    this.steps = [
      { id: 1, title: 'Tipo de isla' },
      { id: 2, title: 'Color de la mesada' },
      { id: 3, title: 'Medida y orientación de la mesada' },
      { id: 4, title: 'Color módulo' },
    ];
    this.currentStep = 1;
  }

  goToStep(step: number): void {
    if (this.isSearchActive) {
      console.log('Navegación deshabilitada durante la búsqueda.');
      return;
    }

    if (step === 1 && this.selectedOptions.isla) {
      return;
    }

    if (!this.completedSteps.includes(this.currentStep) && this.currentStep < step) {
      this.completedSteps.push(this.currentStep);
    }

    this.currentStep = step;
    console.log('Paso actual:', this.currentStep);
  }

  clearSearch(): void {
    this.isSearchActive = false;
    this.searchCode = '';
    this.selectedOptions = {};
    console.log('Búsqueda limpiada.');
  }


  generateFinalCode(): string {
    const size = this.selectedOptions.size; // Tamaño de la isla (57, 107, 157)
    const orientation = this.selectedOptions.orientation === 'left' ? 'I' : 'D'; // Orientación
    const colorMesada = this.colorOptions.find(option => option.name === this.selectedOptions.colorMesada)?.prefix || ''; // Prefijo de color de mesada
    const colorModulo = this.selectedOptions.moduleColor || ''; // Prefijo del color de módulo
    const modules = this.selectedOptions.modules?.map((module, index) => {
      const position = ['A', 'B', 'C'][index] || ''; // Asignar posición: A, B, C
      const moduleNumber = module.replace(`${colorModulo}`, '').replace('.png', ''); // Número de módulo sin prefijo
      return `${position}${moduleNumber}`;
    }).join(''); // Unir módulos con sus posiciones

    this.codigoFinal =  `${size}${colorMesada}${orientation}-${colorModulo}${modules}`;
    return this.codigoFinal;
  }


  searchByCode(): void {
    if (!this.searchCode) {
      alert('Por favor, introduce un código.');
      return;
    }

    console.log('Código ingresado:', this.searchCode);

    // Regex actualizado para validar prefijos de 1 o 2 letras y más colores de módulos
    const regex = /^(\d{2,3})([A-Z]{1,2})([ID])-(B|VS|S)([A-C]\d{2})([A-C]\d{2})?([A-C]\d{2})?$/;
    const match = this.searchCode.match(regex);

    if (match) {
      const [
        _, // ignoramos el grupo completo
        size,
        colorMesada,
        orientation,
        moduleColor,
        module1,
        module2,
        module3,
      ] = match;

      // Asignamos los valores decodificados a `selectedOptions`
      this.selectedOptions.size = size;
      this.selectedOptions.orientation = orientation === 'I' ? 'left' : 'right';
      this.selectedOptions.colorMesada = this.getMesadaByPrefix(colorMesada);
      this.selectedOptions.moduleColor = moduleColor;

      // Procesar los módulos seleccionados (1 a 3 módulos)
      const modules = [module1, module2, module3].filter(Boolean); // Ignorar valores `null` o `undefined`
      this.selectedOptions.modules = this.parseModules(modules);

      console.log('Opciones seleccionadas:', this.selectedOptions);

      this.isSearchActive = true; // Activar búsqueda
    } else {
      alert('Código no válido. Inténtalo de nuevo.');
      this.isSearchActive = false; // Desactivar búsqueda
    }
  }


    private getMesadaByPrefix(prefix: string): string {
      console.log('Buscando mesada con prefijo:', prefix);
      const mesada = this.colorOptions.find(option => option.prefix === prefix);
      console.log('Mesada encontrada:', mesada);
      return mesada ? mesada.name : 'Color desconocido';
    }


    private parseModules(modules: string[]): string[] {
      console.log('Procesando módulos:', modules);

      return modules.map(module => {
        const number = module.slice(1); // Obtener número del módulo (ej. "02")
        const modulePath = `../../assets/finalFrente/${this.selectedOptions.moduleColor}${number}FRENTE.png`; // Ruta del módulo
        console.log('Path generado para el módulo:', modulePath);
        return modulePath;
      });
    }


}
