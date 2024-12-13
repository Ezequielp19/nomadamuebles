import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-modules',
  standalone: true,
  templateUrl: './kitchen-modules.component.html',
  styleUrls: ['./kitchen-modules.component.css'],
})
export class KitchenModulesComponent {
  activeTab: 'estantes' | 'cajones' | 'puertas' | 'box' | 'cava' = 'estantes';

  moduleDescriptions = {
    estantes:
      'Perfecta para canastos, ollas grandes y esos objetos únicos que son parte de tu vida que te encantaría tener a la vista y al alcance de tu mano. ¡Sentite orgulloso de tus tesoros y exhibilos!',
    cajones:
      'Ideal para almacenar accesorios, utensilios voluminosos y electrodomésticos de mano. Todo al alcance sin necesidad de quedarte buscando en un montón de cosas apiladas. Abrí un cajón y encontrá fácilmente lo que buscás.',
    puertas:
      'Para una experiencia más íntima con una visión minimalista y limpia del desorden cotidiano en tu cocina. ¿Qué esperás para cerrarle la puerta al caos y disfrutar de una cocina más ordenada?',
    box: 'Combiná funcionalidad y orden. Tené tus utensilios y accesorios a la vista y guardados o siempre al alcance de tu mano. Disfrutá de manera eficiente tu cocina, organizála y dejála lista para usar.',
    cava: 'Con estantes visibles y una cava lateral. Te permite almacenar 6 botellas, listas para disfrutar. Tené todo organizado y al alcance. ¡Perfecto para compartir momentos únicos!',
  };

  constructor(
      private router: Router
  ) {}

  setActiveTab(tab: 'estantes' | 'cajones' | 'puertas' | 'box' | 'cava'): void {
    this.activeTab = tab;
  }

  getActiveDescription(): string {
    return this.moduleDescriptions[this.activeTab];
  }

  // Navegar entre vistas
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
