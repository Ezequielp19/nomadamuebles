import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../service/modal.service';

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
  infoItems: Array<{ id: string; title: string; description: string }> = [];
  infoMap: Map<string, { title: string; description: string }> = new Map();
  isMobileView = window.innerWidth <= 768; // Detectar vista móvil
  menuOpen = false;
  // List of available island types
  tipoIslaOptions = [
    { id: 'isla1', name: 'Isla Soledad', size: '57', imagePath: '../../assets/tipoIsla/1modulo.png' },
    { id: 'isla2', name: 'Isla Victoria', size: '107', imagePath: '../../assets/tipoIsla/2modulos.png' },
    { id: 'isla3', name: 'Isla Gran Malvina', size: '157', imagePath: '../../assets/tipoIsla/2modulos2.png' },
    { id: 'isla4', name: 'Isla Trinidad', size: '157', imagePath: '../../assets/tipoIsla/3modulos.png' },
  ];


  // List of available countertop colors
  colorOptions = [
    { id: 'mesada_BN', name: 'Blanco Nature', prefix: 'BN', imagePath: '../../assets/colorMesadas/BlancoN.jpg' },
    { id: 'mesada_SA', name: 'Negro Sauco', prefix: 'SA', imagePath: '../../assets/colorMesadas/NegroS.jpg' },
    { id: 'mesada_K', name: 'Roble Kendall Natural', prefix: 'K', imagePath: '../../assets/colorMesadas/RobleK.webp' },
  ];


  moduleColorOptions = [
    { id: 'modulo_B', name: 'Blanco Liso', prefix: 'B', imagePath: '../../assets/colorModulos/BlancoL.jpg' },
    { id: 'modulo_S', name: 'Verde Safari', prefix: 'S', imagePath: '../../assets/colorModulos/VerdeS.jpg' },
  ];



  orientationImages: Record<string, string> = {
    left: '../../assets/sentidoMedida/left.png',
    right: '../../assets/sentidoMedida/right.png',
  };

  constructor(private modalService: ModalService) {
    this.initializeSteps();
    this.initializeInfoItems();
  }

    // Inicializar el arreglo de infoItems
    initializeInfoItems(): void {
      // Datos estáticos
      const staticInfoItems = [
        { id: 'isla1', title: 'Isla Soledad', description: 'La Isla Soledad es esencial para quienes valoran lo fundamental y buscan eficiencia en lo compacto. Con un único módulo a elección, es ideal para cocinas que requieren un mueble práctico y optimizado. Su diseño con mesada de caída en cascada aporta un toque moderno y elegante. Las ruedas permiten moverla con facilidad, haciendo que tus espacios se adapten dinámicamente a tus necesidades.' },
        { id: 'isla2', title: 'Isla Victoria', description: 'La Isla Victoria es ideal para quienes desean expandir su cocina con mayor superficie de trabajo y almacenamiento. Con dos módulos personalizables, este mueble ofrece una combinación perfecta de funcionalidad y eficiencia. Su diseño con mesada en caída tipo cascada añade un toque moderno y elegante, mientras que las ruedas permiten moverla con facilidad, adaptándose dinámicamente a tus espacios y necesidades.' },
        { id: 'isla3', title: 'Isla Gran Malvina', description: 'La Isla Gran Malvina es ideal para quienes desean maximizar la superficie de trabajo en su cocina. Su amplia mesada con vuelo es perfecta para usar como mesa diaria o zona de preparación, brindando comodidad y funcionalidad en un solo mueble. Con dos módulos a elección para almacenamiento adicional, esta isla combina perfectamente estilo y practicidad. Su diseño con mesada de caída en cascada aporta un toque moderno y elegante, mientras que las ruedas permiten moverla fácilmente, adaptándose a las necesidades de tu espacio.' },
        { id: 'isla4', title: 'Isla Trinidad', description: 'La Isla Trinidad es ideal para quienes desean expandir su cocina y organizarla meticulosamente. Con tres módulos personalizables, este mueble se convierte en la verdadera estrella del hogar, ofreciendo un amplio espacio para almacenamiento y superficie de trabajo. Su diseño con mesada en caída tipo cascada agrega un toque moderno y elegante, mientras que las ruedas permiten moverla con facilidad, adaptando dinámicamente el espacio a tus necesidades.' },
        { id: 'mesada_BN', title: 'Blanco Nature', description: 'Tono de blanco con un sutil veteado que imita la textura de la madera natural.' },
        { id: 'mesada_SA', title: 'Negro Sauco', description: 'De color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.' },
        { id: 'mesada_K', title: 'Roble Kendall Natural', description: 'Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.' },
        { id: 'orientation_left', title: 'Orientación Izquierda', description: 'La orientación izquierda...' },
        { id: 'orientation_right', title: 'Orientación Derecha', description: 'La orientación derecha...' },
        { id: 'modulo_B', title: 'Blanco Liso', description: 'Un color neutro que combina con cualquier ambiente.' },
        { id: 'modulo_S', title: 'Verde Safari', description: 'Para crear el equilibrio perfecto entre la naturaleza y la armonía de las maderas, su tonalidad transmite la conexión con tus raíces.' },
        { id: 'modulo_01', title: 'Módulo 01', description: 'Con 3 espacios de guardado exhibidores. Perfecta para canastos, ollas grandes y esos objetos únicos que son parte de tu vida que te encantaría tener a la vista y al alcance de tu mano. ¡Sentite orgulloso de tus tesoros y exhibilos!' },
        { id: 'modulo_02', title: 'Módulo 02', description: 'Con 3 espacios de guardado y puerta. Para una experiencia más íntima con una visión minimalista y limpia del desorden cotidiano en tu cocina. ¿Qué esperás para cerrarle la puerta al caos y disfrutar de una cocina más ordenada?' },
        { id: 'modulo_03', title: 'Módulo 03', description: 'Con 2 cajones grandes y profundos. Ideal para almacenar accesorios, utensilios voluminosos y electrodomésticos de mano. Todo al alcance sin necesidad de quedarte buscando en un montón de cosas apiladas. Abrí un cajón y encontrá fácilmente lo que buscás.' },
        { id: 'modulo_04', title: 'Módulo 04', description: 'Con 2 cajones medianos y 1 grande. Ideal para tener siempre a mano lo que más usás: cubiertos, utensilios voluminosos, electrodomésticos de mano y accesorios de cocina. Disfrutá de una cocina bien organizada con espacio para todo.' },
        { id: 'modulo_05', title: 'Módulo 05', description: 'Combina privacidad y organización con 2 estantes con puerta y un espacio “box”. Tené a la vista y al alcance de tu mano tus accesorios indispensables. Preparate para cocinar de una forma rápida y fácil. Disfrutá de una cocina siempre lista para vos.' },
        { id: 'modulo_06', title: 'Módulo 06', description: 'Con 2 cajones y un espacio “box”. Combiná funcionalidad y orden. Tené tus utensilios y accesorios a la vista y guardados o siempre al alcance de tu mano. Disfrutá de manera eficiente tu cocina, organizála y dejála lista para usar.' },
        { id: 'modulo_07', title: 'Módulo 07', description: 'Con estantes visibles y una cava lateral. Te permite almacenar 6 botellas, listas para disfrutar. Tené todo organizado y al alcance. ¡Perfecto para compartir momentos únicos!' }
    ];

   // Generar información dinámica para los módulos cargados
   const dynamicModulesInfo = (this.moduleOptions || []).map((module) => {
    const moduleType = this.getModuleType(module); // Usa una función para extraer el tipo
    return {
      id: `modulo_${moduleType}`, // ID dinámico
      title: `Módulo ${moduleType}`,
      description: `Este es el módulo de tipo ${moduleType}, diseñado para tu configuración.`,
    };
  });

  // Combinar ítems estáticos y dinámicos
  const combinedItems = [...staticInfoItems, ...dynamicModulesInfo];
  this.infoMap = new Map(
    combinedItems.map((item) => [item.id, { title: item.title, description: item.description }])
  );
}

// Extrae el tipo de módulo dinámico basado en el nombre del archivo
getModuleType(module: string): string {
  return module.substring(1).replace(/\.(png|jpg|jpeg|svg)$/, ''); // Quita el prefijo y la extensión
}

// Retorna el ID del módulo en base al tipo
getModuleId(module: string): string {
  const moduleType = this.getModuleType(module);
  return `modulo_${moduleType}`;
}

    openInfoModal(itemId: string): void {
      const item = this.infoMap.get(itemId);
      if (item) {
        this.modalService.openModal(item.title, item.description);
      } else {
        this.modalService.openModal(
          'Información no encontrada',
          'No hay información disponible para el artículo seleccionado.'
        );
      }
    }

    getOrientationInfoId(orientation: 'left' | 'right'): string {
      return `orientation_${orientation}`; // Ajusta según el formato necesario
    }

    getOrientationAltText(orientation: 'left' | 'right'): string {
      return orientation === 'left' ? 'Orientación izquierda' : 'Orientación derecha';
    }

    getOrientationDisplayName(orientation: 'left' | 'right'): string {
      return orientation === 'left' ? 'Izquierda' : 'Derecha';
    }
    getModuleDisplayName(module: string): string {
      // Elimina la extensión del archivo
      const moduleName = module.replace(/\.[^/.]+$/, '');

      // Mapeo para convertir nombres de archivos en títulos legibles
      const moduleMap: { [key: string]: string } = {
        B01: 'Módulo 01',
        B02: 'Módulo 02',
        B03: 'Módulo 03',
        B04: 'Módulo 04',
        B05: 'Módulo 05',
        B06: 'Módulo 06',
        B07: 'Módulo 07',
        // Agrega más mapeos según tus necesidades
      };

      // Devuelve el nombre del módulo o el nombre original si no está en el mapeo
      return moduleMap[moduleName] || moduleName;
    }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

    onModuleSelectionChange(): void {
      this.initializeSteps(); // Regenerar los pasos cuando cambien los módulos.
    }

    initializeSteps(): void {
      this.steps = [
        { id: 1, title: 'Tipo de isla' },
        { id: 2, title: 'Color de la mesada' },
        { id: 3, title: 'Medida y orientación de la mesada' },
        { id: 4, title: 'Color módulo' },
      ];

      const modules = this.selectedOptions.modules ?? [];
      modules.forEach((_, index) => {
        this.steps.push({ id: 5 + index, title: `Módulo ${index + 1}` });
      });

      this.steps.push({ id: 5 + modules.length, title: 'Resultado Final' });

      console.log('Pasos inicializados:', this.steps);
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


selectModuleColor(color: string) {
  const selectedColor = this.moduleColorOptions.find((option) => option.name === color);
  if (selectedColor) {
    this.selectedOptions.moduleColor = selectedColor.prefix;
    this.moduleOptions = this.availableModules.map(
      (module) => `${selectedColor.prefix}${module}.png`
    );
  }
  this.initializeSteps(); // Recalcular pasos después de seleccionar color de módulo
  this.goToStep(5);
}


  selectModule(module: string, step: number) {
    if (this.selectedOptions.modules) {
      this.selectedOptions.modules[step - 5] = module;
    }
    this.initializeSteps(); // Recalcular pasos después de seleccionar módulo

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
