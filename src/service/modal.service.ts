import { Injectable, ComponentRef, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { InfoModalComponent } from '../app/info-modal/info-modal.component' ;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  openModal(title: string, content: string[]):void {
    // Crear un componente dinámicamente
    const factory = this.resolver.resolveComponentFactory(InfoModalComponent);
    const componentRef: ComponentRef<InfoModalComponent> = factory.create(this.injector);

    // Configurar propiedades del componente
    componentRef.instance.title = title;
    componentRef.instance.content = content;

    // Añadir el componente al DOM
    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
  }
}
