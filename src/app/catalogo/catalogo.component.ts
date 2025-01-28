import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent {
  productos = [
    {
      id: 1,
      nombre: 'Isla Soledad con tres cajones',
      imagen: 'assets/catalogo/prod1.png',
      descripcion: 'La solución ideal para espacios pequeños. Transformá tu cocina con la Isla Soledad de Más Nómada. Diseñada especialmente para optimizar el espacio, esta isla es compacta, funcional y estéticamente atractiva.',
      precio: 325000,
      codigo: '57SAI-BA04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Módulo: 2 Cajones amplios de 13x40 y un super cajón de 25x40',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina negra con textura BARK (Madera quemada)',
        'Ruedas de alta resistencia con FRENO: Adaptá tu isla a diferentes espacios según lo necesites.'
      ],
      razones: [
        'Aprovechás cada centímetro de tu cocina, incluso en espacios reducidos.',
        'Movilidad total para rediseñar y organizar tu hogar a tu manera.',
        'Materiales de calidad que combinan diseño y durabilidad.'
      ]
    },
    {
      id: 2,
      nombre: 'Isla Soledad con estantería + CAVA',
      imagen: 'assets/catalogo/prod2.png',
      descripcion: 'La solución ideal para quienes aman compartir momentos únicos. Transformá tu cocina con la Isla Soledad de Más Nómada. Diseñada para combinar funcionalidad y estilo, esta isla te permite organizar, disfrutar y optimizar tus espacios con elegancia.',
      precio: 250000,
      codigo: '57KI-BA07',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Módulo: 2 estantes amplios, ideales para vajilla o utensilios grandes como licuadoras.',
        'Cava lateral con capacidad para 6 botellas de vino (cubículos de 11 cm).',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina color Kendall Natural con acabado natural.',
        'Ruedas de alta resistencia: Mové tu isla con facilidad y adaptala a cada ocasión.'
      ],
      razones: [
        'Organización: Guardá vajilla, accesorios y vinos en un diseño funcional.',
        'Estilo único: Combiná elegancia y practicidad en tu cocina.',
        'Versatilidad total: Rediseñá y organizá tus espacios según lo necesites.'
      ]
    },
    {
      id: 3,
      nombre: 'Isla Victoria con Maxi Cajonera',
      imagen: 'assets/catalogo/prod3.png',
      descripcion: 'La solución para una cocina organizada y funcional. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm combina capacidad de almacenamiento, estilo moderno y versatilidad, ideal para transformar tu espacio.',
      precio: 570000,
      codigo: '107KI-BA03B04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Primer módulo: 2 cajones grandes y profundos con una altura de 25cm, perfectos para utensilios voluminosos, electrodomésticos de mano o accesorios grandes.',
        'Segundo módulo: 2 cajones de 13cm de altura y 1 cajón grande de 25cm de altura, ideales para organizar cubiertos, utensilios de uso frecuente y otros accesorios de cocina.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina color Kendall Natural con acabado natural.',
        'Color de cuerpo del mueble blanco liso.',
        'Ruedas de alta resistencia con FRENO: Mové tu isla según lo necesites, adaptándola a diferentes espacios y momentos.'
      ],
      razones: [
        'Mantené todo al alcance: Organizá tus utensilios y accesorios de manera práctica.',
        'Versatilidad: Movilidad total para rediseñar tu espacio según lo que necesites.',
        'Estilo y calidad: Materiales duraderos y diseño contemporáneo que destacan en cualquier cocina.'
      ]
    },
    {
      id: 4,
      nombre: 'Isla Victoria Estantería + CAVA',
      imagen: 'assets/catalogo/prod4.png',
      descripcion: 'La mezcla perfecta entre funcionalidad y estilo. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm es ideal para quienes buscan una cocina organizada, elegante y lista para momentos únicos.',
      precio: 420000,
      codigo: '107SAI-BA07B02',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Estantes visibles para organizar vajilla, utensilios grandes o elementos decorativos, perfectos para canastos.',
        'Cava lateral con capacidad para 6 botellas de vino, listas para disfrutar.',
        'Estantes con puerta que te ofrecen una solución minimalista y ordenada.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina color Sauco Negro, con un acabado que imita la textura de madera quemada.',
        'Ruedas de alta resistencia con FRENO: Mové tu isla con facilidad y adaptala a diferentes espacios según tus necesidades.'
      ],
      razones: [
        'Elegancia y orden: Cerrale la puerta al caos y disfrutá de una cocina más limpia y funcional.',
        'Espacio optimizado: Organizá botellas, utensilios y accesorios en un diseño práctico y moderno.',
        'Materiales premium: Diseño duradero que se adapta a cualquier estilo de cocina.'
      ]
    },
    {
      id: 5,
      nombre: 'Isla Victoria Cajonera + Estantes',
      imagen: 'assets/catalogo/prod5.png',
      descripcion: 'La mezcla perfecta entre funcionalidad y estilo. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm es ideal para quienes buscan una cocina organizada, elegante y lista para momentos únicos.',
      precio: 495000,
      codigo: '107BNI-SA02B04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Primer módulo: Estantes con puerta que te ofrecen una solución minimalista y ordenada.',
        'Segundo módulo: 2 cajones de 13cm de alto y 1 cajón grande de 25cm de alto, ideales para organizar cubiertos, utensilios de uso frecuente y otros accesorios de cocina como batidora de mano etc.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina color Blanco Nature, con un acabado que imita la textura de madera en color blanco.',
        'El cuerpo del mueble es color verde safari.',
        'Ruedas de alta resistencia con FRENO: Move tu isla con facilidad y adáptala a diferentes espacios según tus necesidades.'
      ],
      razones: [
        'Elegancia y orden: Cerrale la puerta al caos y disfrutá de una cocina más limpia y funcional.',
        'Espacio optimizado: Organizá botellas, utensilios y accesorios en un diseño práctico y moderno.',
        'Materiales premium: Diseño duradero que se adapta a cualquier estilo de cocina.',
        'Estética: Agregale ese toque único con el color verde safari y destaca por sobre los demás.'
      ]
    },
    {
      id: 6,
      nombre: 'Isla Gran Malvina Estantes + Cajones + Box',
      imagen: 'assets/catalogo/prod6.png',
      descripcion: 'El equilibrio perfecto entre funcionalidad y diseño. Transformá tu cocina con esta isla de 157x50 cm de Más Nómada. Ideal para quienes necesitan espacio extra sin renunciar al estilo, esta isla es la solución perfecta para optimizar y organizar cualquier ambiente te regala un espacio de la mesada para que puedas usarlo como mesa.',
      precio: 525000,
      codigo: '157SAI-BA06B05',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Primer módulo: Espacio cerrado con puerta + estante box, ideal para mantener el orden y almacenar utensilios o accesorios de manera discreta, dejando lo que mas necesitas al alcance de tu mano en el box.',
        'Segundo módulo: Espacio box abierto + cajones, perfecto para exhibir elementos decorativos, electrodomésticos de uso diario o utensilios de fácil acceso.',
        'Mesada en cascada: Diseñada en melamina color Sauco Negro, con un acabado que imita la textura de madera quemada.',
        'Ruedas de alta resistencia con FRENO: Mové tu isla fácilmente para adaptarla a tus necesidades.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para una cocina más práctica.',
        'Diseño minimalista: Su combinación de blanco liso y madera negra se adapta a cualquier estilo de decoración.',
        'Versatilidad: Movilidad total para rediseñar tu cocina según lo necesites.'
      ]
    },
    {
      id: 7,
      nombre: 'Isla Gran Malvina MaxiCajonera',
      imagen: 'assets/catalogo/prod7.png',
      descripcion: 'El equilibrio perfecto entre funcionalidad y diseño. Transformá tu cocina con esta isla de 157x50 cm de Más Nómada. Ideal para quienes necesitan espacio extra sin renunciar al estilo, esta isla es la solución perfecta para optimizar y organizar cualquier ambiente. Una sección de la mesada está diseñada para que puedas usarla como mesa, ideal para comidas rápidas o momentos compartidos.',
      precio: 600000,
      codigo: '157KI-SA04B04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Doble módulo Maxi cajonera con 4 cajones con 13cm de altura y 2 super cajones de 25cm de altura perfectos para utensilios voluminosos, electrodomésticos de mano o accesorios grandes.',
        'Mesada en cascada: Diseñada en melamina color Kendall Natural con acabado natural.',
        'Cuerpo del mueble color verde Safari para los que les encanta tener un toque de color en su cocina.',
        'Ruedas de alta resistencia con FRENO: Mové tu isla fácilmente para adaptarla a tus necesidades.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para una cocina más práctica.',
        'Versatilidad: Movilidad total para rediseñar tu cocina según lo necesites.',
        'Estilo Rustic Modern: Un estilo que combina elementos rústicos (como la madera) con detalles más modernos, donde el verde añade un toque de vida y frescura.'
      ]
    },
    {
      id: 8,
      nombre: 'Isla Gran Malvina Estantería con puertas + Box',
      imagen: 'assets/catalogo/prod8.png',
      descripcion: 'El equilibrio perfecto entre funcionalidad y diseño. Transformá tu cocina con esta isla de 157x50 cm de Más Nómada. Ideal para quienes necesitan espacio extra sin renunciar al estilo, esta isla es la solución perfecta para optimizar y organizar cualquier ambiente. Una sección de la mesada está diseñada para que puedas usarla como mesa, ideal para comidas rápidas o momentos compartidos.',
      precio: 450000,
      codigo: '157BNI-BA02B05',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Primer módulo: Estantería con puerta, ideal para mantener el orden y almacenar utensilios o accesorios de manera discreta.',
        'Segundo módulo: Espacio box abierto, perfecto para exhibir elementos decorativos, electrodomésticos de uso diario o utensilios de fácil acceso y estantería con puerta.',
        'Mesada en cascada: Diseñada en melamina color Blanco Nature, con un acabado que imita la textura de madera en color blanco.',
        'Ruedas de alta resistencia con FRENO: Mové tu isla fácilmente para adaptarla a tus necesidades.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para una cocina más práctica.',
        'Diseño minimalista: Su combinación de blanco liso y madera clara se adapta a cualquier estilo de decoración.',
        'Versatilidad: Movilidad total para rediseñar tu cocina según lo necesites.'
      ]
    },
    {
      id: 9,
      nombre: 'Isla Trinidad Doble Cajonera + Estantería + Box',
      imagen: 'assets/catalogo/prod9.png',
      descripcion: 'Transformá tu cocina con la Isla Trinidad de 157x50 cm. Diseñada con tres módulos, es ideal para quienes buscan espacio extra sin renunciar al estilo.',
      precio: 720000,
      codigo: '157BNI-SA04B05C04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Cuatro cajones pequeños de 13cm de altura y dos grandes de 25cm para almacenamiento discreto.',
        'Espacio box abierto y estantería con puerta para almacenamiento accesible.',
        'Mesada en cascada: Melamina color Blanco Nature, con textura de madera blanca, combinada con un cuerpo color verde safari.',
        'Ruedas de alta resistencia con freno para adaptarla a cualquier espacio.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para mayor practicidad.',
        'Versatilidad: Movilidad total para reorganizar tu cocina según tus necesidades.',
        'Estilo Rustic Modern: Combina detalles rústicos y modernos con un toque de color verde fresco.'
      ]
    },
    {
      id: 10,
      nombre: 'Isla Trinidad con Estantería con y sin Puerta',
      imagen: 'assets/catalogo/prod10.png',
      descripcion: 'La Isla Trinidad de 157x50 cm es ideal para quienes necesitan espacio adicional sin sacrificar el diseño. Perfecta para organizar y optimizar tu cocina.',
      precio: 570000,
      codigo: '157KI-BA02B02C01',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Espacio box abierto ideal para decoración o utensilios de uso diario.',
        'Estantería con puerta para almacenamiento cerrado.',
        'Mesada en cascada: Melamina color Kendall Natural, con un cuerpo en blanco liso.',
        'Ruedas de alta resistencia con freno para facilitar el movimiento.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para mayor funcionalidad.',
        'Versatilidad: Movilidad total para rediseñar tu cocina.',
        'Estilo y calidad: Diseño contemporáneo con materiales duraderos que destacan en cualquier cocina.'
      ]
    },
    {
      id: 11,
      nombre: 'Isla Trinidad con Triple Cajonera',
      imagen: 'assets/catalogo/prod11.png',
      descripcion: 'Transformá tu cocina con la Isla Trinidad de 157x50 cm. Con un diseño minimalista y almacenamiento optimizado, es perfecta para organizar cualquier ambiente.',
      precio: 795000,
      codigo: '157SAI-BA04B04C04',
      tiemposEntrega: 'Tu isla se fabricará especialmente para vos. Una vez confirmada la compra, tiene un tiempo de armado de 12 días hábiles. El despacho se realiza dentro de este plazo.',
      caracteristicas: [
        'Triple cajonera con 6 cajones de 13cm y 3 súper cajones de 25cm.',
        'Mesada en cascada: Melamina color Sauco Negro, con textura de madera quemada.',
        'Cuerpo del mueble color blanco.',
        'Ruedas de alta resistencia con freno para adaptarla a cualquier espacio.'
      ],
      razones: [
        'Espacio optimizado: Combiná almacenamiento cerrado y accesible para mayor practicidad.',
        'Diseño minimalista: Blanco liso y madera negra que se adaptan a cualquier estilo.',
        'Versatilidad: Movilidad total para reorganizar tu cocina según tus necesidades.'
      ]
    }
  ];

  constructor(private router:Router) {}

  viewProductDetails(productId: number): void {
    this.router.navigate(['/detalle-producto', productId]);
  }

}
