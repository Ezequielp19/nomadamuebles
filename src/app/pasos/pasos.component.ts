import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../service/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoService } from '../../service/mercadopago.service';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, DecimalPipe,  FooterComponent],
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css'],
})
export class PasosComponent implements OnInit {

  currentStep: number = 1;
  orientations: ('left' | 'right')[] = ['left', 'right'];
  steps: { id: number; title: string }[] = [];
  selectedOptions: {
    isla?: string;
    colorMesada?: string;
    orientation?: 'left' | 'right';
    price?: number; // Cambiado a opcional
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
  totalPrice: number = 0; // Variable para almacenar el precio total

  showPaymentInputs: boolean = false; // Agregar esta propiedad
  canPay: boolean = false; // Para controlar la habilitación del botón de pago
  isMobileView1 = window.innerWidth <= 768; // Detectar vista móvil
  menuOpen1 = false;

  // List of available island types
  tipoIslaOptions = [
    { id: 'isla1', name: 'Soledad', price: 140000 , size: '57', imagePath: '../../assets/tipoIsla/1modulo.webp' },
    { id: 'isla2', name: 'Victoria', price: 190000 ,size: '107', imagePath: '../../assets/tipoIsla/2modulos.webp' },
    { id: 'isla3', name: 'Gran Malvina',price: 220000 , size: '157', imagePath: '../../assets/tipoIsla/2modulos2.webp' },
    { id: 'isla4', name: 'Trinidad',price: 220000 , size: '157', imagePath: '../../assets/tipoIsla/3modulos.webp' },
  ];


  // List of available countertop colors
  colorOptions = [
    { id: 'mesada_BN', name: 'Blanco Nature', prefix: 'BN', imagePath: '../../assets/colorMesadas/BlancoN.webp' },
    { id: 'mesada_SA', name: 'Negro Sauco', prefix: 'SA', imagePath: '../../assets/colorMesadas/NegroS.webp' },
    { id: 'mesada_K', name: 'Roble Kendall Natural', prefix: 'K', imagePath: '../../assets/colorMesadas/RobleK.webp' },
  ];


  moduleColorOptions = [
    { id: 'modulo_B', name: 'Blanco Liso', prefix: 'B', imagePath: '../../assets/colorModulos/BlancoL.webp' },
    { id: 'modulo_S', name: 'Verde Safari', prefix: 'S', imagePath: '../../assets/colorModulos/VerdeS.webp' },
  ];

  MODULE_PRICES= [
    { id: 'modulo_01', title: 'Módulo 01', price: 130000 },
    { id: 'modulo_02', title: 'Módulo 02', price: 130000 },
    { id: 'modulo_03', title: 'Módulo 03', price: 210000 },
    { id: 'modulo_04', title: 'Módulo 04', price: 210000 },
    { id: 'modulo_05', title: 'Módulo 05', price: 130000 },
    { id: 'modulo_06', title: 'Módulo 06', price: 210000 },
    { id: 'modulo_07', title: 'Módulo 07', price: 130000 }
  ]

  orientationImages: Record<string, string> = {
    left: '../../assets/sentidoMedida/left.png',
    right: '../../assets/sentidoMedida/right.png',
  };

  constructor(private modalService: ModalService,
    private mercadoPagoService: MercadoPagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeSteps();
    this.initializeInfoItems();
  }

  ngOnInit(): void {
    // Detectar el código en la URL al inicializar el componente
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.searchCode = code;
        this.searchByCode(); // Realizar búsqueda automáticamente
      }
    });
  }

  toggleSidebar(): void {
    this.menuOpen1 = !this.menuOpen1;
  }

  @HostListener('window:resize',  ['$event'])
  onResize1(): void {
    this.isMobileView1 = window.innerWidth <= 768;
    if (!this.isMobileView1) {
      this.menuOpen1 = true; // Mostrar el sidebar siempre en pantallas grandes
    }
  }


  shareFurnitureLink(): void {
    if (!this.codigoFinal) {
      alert('Primero genera un código final.');
      return;
    }

    const link = `${window.location.origin}/pasos?code=${this.codigoFinal}`;
    const numeroWhatsApp = "5491131387808"; // Reemplaza con el número de WhatsApp
    const mensaje = `Hola, mira esta isla que he creado: ${link}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  }

  openWhatsAppGiftCard(): void {
    if (!this.codigoFinal) {
      alert('Primero genera un código final.');
      return;
    }

    const link = `${window.location.origin}/pasos?code=${this.codigoFinal}`;
    const numeroWhatsApp = "5491131387808"; // Reemplaza con el número de WhatsApp
    const mensaje = `Hola, quiero adquirir una Gift Card para la isla con este enlace: ${link}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  }

    // Inicializar el arreglo de infoItems
    initializeInfoItems(): void {
      // Datos estáticos
      const staticInfoItems = [
        {
          id: 'isla1', title: 'Soledad', price: 130000 , description: 'Tamaño: Mesada de 57x50 cm | Módulo: 1 a elección. Perfecta para espacios pequeños La Isla Soledad es el diseño compacto de Más Nómada, ideal para esos rincones donde parece que no hay lugar para nada más, pero vos sabés que un poco de funcionalidad extra hace toda la diferencia. Sofisticación en cada detalle: Su mesada en cascada es moderna y elegante. Movilidad total: Rediseñá y aprovechá tus espacios al máximo; las ruedas de tu isla te permiten moverla con facilidad y adaptarla a cada momento. Compacta y funcional, pensada para vos'
        },
        { id: 'isla2', title: 'Victoria', price: 180000 ,description: 'Tamaño: Mesada de 107x50 cm | Módulos: 2 a elección. La Isla Victoria es ese toque de espacio que siempre quisiste en tu cocina. Con dos módulos a medida y con ese extra de mesada es práctica, funcional y diseñada para facilitarte el día a día. Sofisticación en cada detalle: Su mesada en cascada es moderna y elegante. Movilidad total: Rediseñá y aprovechá tus espacios al máximo; las ruedas de tu isla te permiten moverla con facilidad y adaptarla a cada momento. Más almacenamiento, más estilo, más espacio para vos.'},
        { id: 'isla3', title: 'Gran Malvina',price: 210000 , description: 'Tamaño: Mesada de 157x50 cm | Módulos: 2 a elección. Si buscás un espacio que lo tenga todo, la Isla Gran Malvina es para vos. Su gran mesada con vuelo y sus módulos personalizables la convierten en un centro de actividades para toda la casa. Sofisticación en cada detalle: Su mesada en cascada es moderna y elegante. Movilidad total: Rediseñá y aprovechá tus espacios al máximo; las ruedas de tu isla te permiten moverla con facilidad y adaptarla a cada momento. La Isla Gran Malvina es más que una isla: es tu nuevo espacio favorito.' },
        { id: 'isla4', title: 'Trinidad', price: 210000 ,description: 'Tamaño: Mesada de 157x50cm| Módulos: 3 a elección. Con la Isla Trinidad, tu cocina no solo será más funcional, será el lugar donde todos querrán estar. Amplia, organizada y completamente personalizable, está diseñada para quienes buscan el máximo. Sofisticación en cada detalle: Su mesada en cascada es moderna y elegante. Movilidad total: Rediseñá y aprovechá tus espacios al máximo; las ruedas de tu isla te permiten moverla con facilidad y adaptarla a cada momento. Para quienes quieren todo: funcionalidad, estilo y el mejor lugar para compartir.' },
        { id: 'mesada_BN', title: 'Blanco Nature', description: 'Tono de blanco con un sutil veteado que imita la textura de la madera natural.' },
        { id: 'mesada_SA', title: 'Negro Sauco', description: 'De color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.' },
        { id: 'mesada_K', title: 'Roble Kendall Natural', description: 'Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.' },
        { id: 'orientation_left', title: 'Orientación Izquierda', description: 'La orientación izquierda...' },
        { id: 'orientation_right', title: 'Orientación Derecha', description: 'La orientación derecha...' },
        { id: 'modulo_B', title: 'Blanco Liso', description: 'Un color neutro que combina con cualquier ambiente.' },
        { id: 'modulo_S', title: 'Verde Safari', description: 'Para crear el equilibrio perfecto entre la naturaleza y la armonía de las maderas, su tonalidad transmite la conexión con tus raíces.' },
        { id: 'modulo_01', title: 'Módulo 01', price: 130000 ,description: 'Con 3 espacios de guardado exhibidores. Perfecta para canastos, ollas grandes y esos objetos únicos que son parte de tu vida que te encantaría tener a la vista y al alcance de tu mano. ¡Sentite orgulloso de tus tesoros y exhibilos!' },
        { id: 'modulo_02', title: 'Módulo 02', price: 130000 ,description: 'Con 3 espacios de guardado y puerta. Para una experiencia más íntima con una visión minimalista y limpia del desorden cotidiano en tu cocina. ¿Qué esperás para cerrarle la puerta al caos y disfrutar de una cocina más ordenada?' },
        { id: 'modulo_03', title: 'Módulo 03', price: 210000 ,description: 'Con 2 cajones grandes y profundos. Ideal para almacenar accesorios, utensilios voluminosos y electrodomésticos de mano. Todo al alcance sin necesidad de quedarte buscando en un montón de cosas apiladas. Abrí un cajón y encontrá fácilmente lo que buscás.' },
        { id: 'modulo_04', title: 'Módulo 04', price: 210000 ,description: 'Con 2 cajones medianos y 1 grande. Ideal para tener siempre a mano lo que más usás: cubiertos, utensilios voluminosos, electrodomésticos de mano y accesorios de cocina. Disfrutá de una cocina bien organizada con espacio para todo.' },
        { id: 'modulo_05', title: 'Módulo 05', price: 130000 ,description: 'Combina privacidad y organización con 2 estantes con puerta y un espacio “box”. Tené a la vista y al alcance de tu mano tus accesorios indispensables. Preparate para cocinar de una forma rápida y fácil. Disfrutá de una cocina siempre lista para vos.' },
        { id: 'modulo_06', title: 'Módulo 06', price: 210000 ,description: 'Con 2 cajones y un espacio “box”. Combiná funcionalidad y orden. Tené tus utensilios y accesorios a la vista y guardados o siempre al alcance de tu mano. Disfrutá de manera eficiente tu cocina, organizála y dejála lista para usar.' },
        { id: 'modulo_07', title: 'Módulo 07', price: 130000 ,description: 'Con estantes visibles y una cava lateral. Te permite almacenar 6 botellas, listas para disfrutar. Tené todo organizado y al alcance. ¡Perfecto para compartir momentos únicos!' }
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

// Agregar mesadas seleccionadas dinámicamente con descripción del array estático
const dynamicCountertops = this.colorOptions.map((color) => {
  const matchingItem = staticInfoItems.find((item) => item.id === color.id);
  return {
    id: color.id, // Asegúrate de que `color.id` sea correcto
    title: color.name,
    description: matchingItem?.description || 'Descripción de la mesada seleccionada.',
  };
});

  // Agregar módulos seleccionados dinámicamente
  const dynamicModules = (this.moduleOptions || []).map((module) => ({
    id: this.getInfoItemIdForModule(module),
    title: `Módulo ${module}`,
    description: `Descripción para el módulo ${module}.`,
  }));

  // Combinar ítems
  const combinedItems = [...staticInfoItems, ...dynamicCountertops, ...dynamicModules, ...dynamicModulesInfo];
  this.infoMap = new Map(
    combinedItems.map((item) => [item.id, { title: item.title, description: item.description }])
  );
}

// Extrae el tipo de módulo dinámico basado en el nombre del archivo
getModuleType(module: string): string {
  return module.substring(1).replace(/\.(png|jpg|jpeg|svg|webp)$/, ''); // Quita el prefijo y la extensión
}

// Retorna el ID del módulo en base al tipo
getModuleId(module: string): string {
  const moduleType = this.getModuleType(module);
  return `modulo_${moduleType}`;
}

openInfoModal(itemId: string): void {
  console.log('Buscando información para:', itemId);
  const item = this.infoMap.get(itemId);
  if (item) {
    const formattedDescription = this.formatDescription(item.description);
    this.modalService.openModal(item.title, formattedDescription);
  } else {
    console.warn('No se encontró información para:', itemId);
    this.modalService.openModal(
      'Información no encontrada',
      ['No hay información disponible para el artículo seleccionado.']
    );
  }
}

private formatDescription(description: string): string[] {
  // Dividir el texto en partes claras: ". algo :" separa subtítulos del texto
  return description.split(/(?<=\.)\s+(?=\w+.*?:)/g).map((part) => part.trim());
}


    getOrientationInfoId(orientation: 'left' | 'right'): string {
      return `orientation_${orientation}`; // Ajusta según el formato necesario
    }

    getColorOptionId(name: string | undefined): string {
      if (!name) return ''; // Devuelve una cadena vacía si no hay un nombre válido
      const colorOption = this.colorOptions.find((option) => option.name === name);
      return colorOption?.id || ''; // Asegúrate de que devuelva el `id` correcto o una cadena vacía
    }



    getModuleImagePath(module: string): string {
      const moduleColor = this.selectedOptions.moduleColor;
      const moduleId = module.replace(`${moduleColor}`, '').replace('.webp', '');
      return `../../assets/modulos/${moduleColor}${moduleId}.webp`;
    }

    getInfoItemIdForModule(module: string): string {
      const moduleColor = this.selectedOptions.moduleColor;
      return module.replace(`${moduleColor}`, '').replace('.webp', '');
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
        S01: 'Módulo 01',
        S02: 'Módulo 02',
        S03: 'Módulo 03',
        S04: 'Módulo 04',
        S05: 'Módulo 05',
        S06: 'Módulo 06',
        S07: 'Módulo 07',
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

      // console.log('Pasos inicializados:', this.steps);
    }


  get totalSteps(): number {
    return this.steps.length;
  }

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  selectIsla(tipo: string, size: string, price: number): void {
    this.selectedOptions.isla = tipo;
    this.selectedOptions.size = size;
    this.selectedOptions.price = price; // Asignar el precio de la isla seleccionada
    this.totalPrice = price; // Actualizar el precio total

    // Definir número de módulos permitidos según el tipo de isla
    if (tipo === 'Gran Malvina') {
      this.moduleSteps = 2;
    } else if (tipo === 'Trinidad') {
      this.moduleSteps = 3;
    } else if (tipo === 'Soledad') {
      this.moduleSteps = 1;
    } else {
      this.moduleSteps = 2;
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
      left: `../../assets/sentidoMedida/${prefix}${size}.webp`,
      right: `../../assets/sentidoMedida/${prefix}${size}Opuesto.webp`,
    };
  }

  this.goToStep(3);
}

selectOrientation(orientation: 'left' | 'right') {
  this.selectedOptions.orientation = orientation;
  this.goToStep(4);
}


selectModuleColor(color: string) {
  const selectedColor = this.moduleColorOptions.find((option) => option.name === color);
  if (selectedColor) {
    this.selectedOptions.moduleColor = selectedColor.prefix;
    this.moduleOptions = this.availableModules.map(
      (module) => `${selectedColor.prefix}${module}.webp`
    );
  }
  this.initializeSteps(); // Recalcular pasos después de seleccionar color de módulo
  this.goToStep(5);
}


selectModule(module: string, step: number) {
  const moduleIndex = step - 5;

  // Asegurarse de que 'selectedOptions.modules' esté inicializado
  if (!this.selectedOptions.modules) {
    this.selectedOptions.modules = [];
  }

  // Restar el precio anterior si ya había un módulo seleccionado
  if (this.selectedOptions.modules[moduleIndex]) {
    const previousModuleName = this.selectedOptions.modules[moduleIndex].replace(/\.[^/.]+$/, '');
    const previousModule = this.MODULE_PRICES.find(
      (item) => item.title === this.getModuleDisplayName(previousModuleName)
    );
    if (previousModule) {
      this.totalPrice -= previousModule.price; // Restar precio anterior
    }
  }

  // Guardar el nuevo módulo
  this.selectedOptions.modules[moduleIndex] = module;

  // Sumar el nuevo precio
  const moduleName = module.replace(/\.[^/.]+$/, ''); // Quita la extensión
  const selectedModule = this.MODULE_PRICES.find(
    (item) => item.title === this.getModuleDisplayName(moduleName)
  );

  if (selectedModule) {
    this.totalPrice += selectedModule.price; // Sumar el nuevo precio
  }

  this.initializeSteps(); // Recalcular pasos después de seleccionar módulo

  // Ir al siguiente módulo o al paso final
  if (step < 4 + this.moduleSteps) {
    this.goToStep(step + 1);
  } else {
    this.goToStep(4 + this.moduleSteps + 1); // Paso final
  }
}



  getModulePrice(module: string): number | string {
    // Elimina la extensión del archivo
    const moduleName = module.replace(/\.[^/.]+$/, '');

    // Busca el precio correspondiente en MODULE_PRICES
    const modulePrice = this.MODULE_PRICES.find(
      (item) => item.title === this.getModuleDisplayName(moduleName)
    );

    return modulePrice?.price || 'Precio no disponible';
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
      countertopImage = `../../assets/finalFrente/${colorOption.prefix}${size}FRENTE.webp`;
    } else if (this.selectedOptions.orientation === 'right') {
      countertopImage = `../../assets/finalFrente/${colorOption.prefix}${size}FRENTEOpuesto.webp`;
    } else {
      console.error('La orientación de la mesada no es válida.');
      countertopImage = ''; // Imagen vacía en caso de error
    }

    // Generar imágenes de módulos
    const modulesImages = this.selectedOptions.modules.map((module) => {
      // Quitar el prefijo duplicado y la extensión .png
      const moduleId = module.replace(`${moduleColor}`, '').replace('.webp', '');
      return `../../assets/finalFrente/${moduleColor}${moduleId}FRENTE.webp`;
    });

    return {
      countertop: countertopImage,
      modules: modulesImages,
    };
  }

  generateSelectableImages(): { countertop: string; modules: string[] } {
    const size = this.selectedOptions.size;
    const colorOption = this.colorOptions.find(
      (option) => option.name === this.selectedOptions.colorMesada
    );
    const moduleColor = this.selectedOptions.moduleColor;

    if (!size || !colorOption || !moduleColor || !this.selectedOptions.modules) {
      console.error('Faltan opciones para generar las imágenes seleccionables.');
      return { countertop: '', modules: [] };
    }

    // Generar la imagen de la mesada
    const countertopImage = `../../assets/sentidoMedida/${colorOption.prefix}${size}.webp`;

    // Generar imágenes de los módulos seleccionados
    const modulesImages = this.selectedOptions.modules.map((module) => {
      const moduleId = module.replace(`${moduleColor}`, '').replace('.webp', '');
      return `../../assets/modulos/${moduleColor}${moduleId}.webp`;
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
    const islandType = this.selectedOptions.isla; // Tipo de isla seleccionada (e.g., 'Gran Malvina')
    // console.log(islandType)
    if (!size || !orientation) {
      console.error('Faltan opciones para determinar la clase de la mesada.');
      return 'module-wrapper-default'; // Clase por defecto si faltan opciones
    }

    // Determinar la clase base según el tipo de isla
    let className = `module-wrapper-${size}`;

  // Añadir orientación al final de la clase
  className += orientation === 'left' ? 'L' : 'R';

    // Manejo especial para la Isla "Gran Malvina" con medida 107 y 2 módulos
    if (islandType === 'Gran Malvina' && size === '157') {
      className += '2M';
    }


    // console.log(className)
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
    this.totalPrice = 0; // Reinicia el precio a 0

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

    if (!this.isStepComplete(this.currentStep) && this.currentStep < step) {
      const errorMessage = this.getStepIncompleteMessage(this.currentStep);
      console.log(`Error mostrado al usuario: ${errorMessage}`); // Confirmar en consola
      alert(errorMessage); // Mostrar el mensaje específico del paso
      return;
    }


    // Marcar el paso como completado si se avanza
    if (!this.completedSteps.includes(this.currentStep)) {
      this.completedSteps.push(this.currentStep);
    }

    this.currentStep = step;
  }

  getStepIncompleteMessage(step: number): string {
    switch (step) {
      case 1:
        return 'Por favor, selecciona una isla antes de continuar.';
      case 2:
        return 'Por favor, selecciona un color de mesada antes de continuar.';
      case 3:
        return 'Por favor, selecciona la orientación de la isla antes de continuar.';
      case 4:
        return 'Por favor, selecciona un color para los módulos antes de continuar.';
      default:
        return 'Por favor, completa el paso actual antes de continuar.';
    }
  }


  isStepComplete(step: number): boolean {
    switch (step) {
      case 1:
        return !!this.selectedOptions.isla; // Verifica que se haya seleccionado una isla
      case 2:
        return !!this.selectedOptions.colorMesada; // Verifica que se haya seleccionado un color de mesada
      case 3:
        return !!this.selectedOptions.orientation; // Verifica que se haya seleccionado una orientación
      case 4:
        return !!this.selectedOptions.moduleColor; // Verifica que se haya seleccionado un color de módulo
      default:
        return true; // Asumir que los demás pasos están completos por ahora
    }
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
      const moduleNumber = module.replace(`${colorModulo}`, '').replace('.webp', ''); // Número de módulo sin prefijo
      return `${position}${moduleNumber}`;
    }).join(''); // Unir módulos con sus posiciones

    this.codigoFinal = `${size}${colorMesada}${orientation}-${colorModulo}${modules}`;

    console.log('Código generado:', this.codigoFinal);
    return this.codigoFinal;
  }

  searchByCode(): void {
    if (!this.searchCode) {
      alert('Por favor, introduce un código.');
      return;
    }

    // console.log('Código ingresado:', this.searchCode);

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
        const modulePath = `../../assets/finalFrente/${this.selectedOptions.moduleColor}${number}FRENTE.webp`; // Ruta del módulo
        console.log('Path generado para el módulo:', modulePath);
        return modulePath;
      });
    }

    sendPaymentData(): void {
      const productData = {
        totalAmount: this.totalPrice,
        codigoFinal: this.codigoFinal,
      };


      console.log('Enviando datos del producto:', productData);

      // Guardar los datos en localStorage antes de navegar
      localStorage.setItem('productData', JSON.stringify(productData));

      this.router.navigate(['/pagos']);
    }

}

