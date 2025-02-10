import { Component, OnInit } from '@angular/core';
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
export class CatalogoComponent implements OnInit {
  productos = [
    {
      id: 1,
      tipo_isla: "soledad",
      nombre: 'Isla Soledad con estantería + CAVA',
      imagen: 'assets/catalogo/prod1.webp',
      descrip_corta: 'Módulo cava y estantería. Blanco, mesada Kendal natural. Ruedas con freno.',
      descripcion: 'La solución ideal para quienes aman compartir momentos únicos. Transformá tu cocina con la Isla Soledad de Más Nómada. Diseñada para combinar funcionalidad y estilo, esta isla te permite organizar, disfrutar y optimizar tus espacios con elegancia.',
      precio: 270000,
      codigo: '57KI-BA07',
      caracteristicas: [
        'Módulo: Módulo Cava con estantería.',
        'Color Cuerpo: blanco liso.',
        'Color Mesada: Roble Kendall Natural, Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptala a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 2,
      tipo_isla: "soledad",
      nombre: 'Isla Soledad con estantería + CAVA',
      imagen: 'assets/catalogo/prod2.webp',
      descrip_corta: 'Módulo Box y estantería con puerta (cierre suave). Verde safari, mesada Kendal natural. Ruedas con freno.',
      descripcion: 'Transformá tu cocina con la Isla Soledad de Más Nómada. Diseñada especialmente para optimizar el espacio, esta isla es compacta, funcional y estéticamente atractiva.',
      precio: 270000,
      codigo: '57KI-SA05',
      caracteristicas: [
        'Módulo: Estantería con puerta con cierre suave y espacio box exhibidor.',
        'Color Cuerpo: verde safari.',
        'Color Mesada: Roble Kendall Natural, Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptala a diferentes espacios según lo necesites.',
        'Materiales: Melamina, herrajes de cierre suave y tiradores negros.'
      ]
    },
    {
      id: 3,
      tipo_isla: "soledad",
      nombre: 'Isla Soledad con tres cajones',
      imagen: 'assets/catalogo/prod3.webp',
      descrip_corta: 'Módulo con 2 cajones (13x40 cm) y 1 gran cajón (25x40 cm), cierre suave. Blanco, mesada negro Sauco. Ruedas con freno.',
      descripcion: 'La solución ideal para espacios pequeños. Transformá tu cocina con la Isla Soledad de Más Nómada. Diseñada especialmente para optimizar el espacio, esta isla es compacta, funcional y estéticamente atractiva.',
      precio: 350000,
      codigo: '57SAI-BA04',
      caracteristicas: [
        'Módulo: Cajonera 2 Cajones amplios de 13x40 y un gran cajón de 25x40.',
        'Color Cuerpo: blanco.',
        'Color Mesada: Negro Sauco, de color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptala a diferentes espacios según lo necesites.',
        'Materiales: Melamina, herrajes de cierre suave y tiradores blancos.'
      ]
    },
    {
      id: 4,
      tipo_isla: "victoria",
      nombre: 'Isla Victoria Estantería + CAVA',
      imagen: 'assets/catalogo/prod4.webp',
      descrip_corta: 'Módulo cava y estantería + Módulo estantería con puerta (cierre suave). Blanco, mesada negro Sauco. Ruedas con freno.',
      descripcion: 'La mezcla perfecta entre funcionalidad y estilo. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm es ideal para quienes buscan una cocina organizada, elegante y lista para momentos únicos.',
      precio: 450000,
      codigo: '107SAI-BA07B02',
      caracteristicas: [
        'Módulos: módulo cava y estantería + Módulo de estantería con puerta con cierre suave.',
        'Color Cuerpo: blanco liso.',
        'Color Mesada: Negro Sauco, de color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 5,
      tipo_isla: "victoria",
      nombre: 'Isla Victoria Cajonera + Estantes',
      imagen: 'assets/catalogo/prod5.webp',
      descrip_corta: 'Módulo 3 cajones (cierre suave)+ estantería con puerta (cierre suave). Verde safari, mesada blanco Nature. Ruedas con freno.',
      descripcion: 'La mezcla perfecta entre funcionalidad y estilo. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm es ideal para quienes buscan una cocina organizada, elegante y lista para momentos únicos.',
      precio: 530000,
      codigo: '107BNI-SA02B04',
      caracteristicas: [
        'Módulos:  módulo de 2 Cajones amplios de 13x40 y un gran cajón de 25 x 40 con cierre suave + Módulo de estantería con puerta también con cierre suave.',
        'Color Cuerpo: Verde safari.',
        'Color Mesada: Blanco Nature, tono de blanco con un sutil veteado que imita la textura de la madera natural.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 6,
      tipo_isla: "victoria",
      nombre: 'Isla Victoria con Maxi Cajonera',
      imagen: 'assets/catalogo/prod6.webp',
      descrip_corta: '2 módulos de cajones (5 en total, cierre suave). Blanco, mesada blanco Nature. Ruedas con freno.',
      descripcion: 'La solución para una cocina organizada y funcional. Descubrí la Isla de Cocina Victoria de Más Nómada. Este diseño de 107x50 cm combina capacidad de almacenamiento, estilo moderno y versatilidad, ideal para transformar tu espacio.',
      precio: 610000,
      codigo: '107KI-BA03B04',
      caracteristicas: [
        'Módulos:  módulo de 2 Cajones amplios de 13x40 y un super cajón de 25x40 + Módulo de 2 super cajones de 25x40 todos con cierre suave.',
        'Color Cuerpo: Blanco liso.',
        'Color Mesada: Roble Kendall Natural, Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 7,
      tipo_isla: "malvina",
      nombre: 'Isla Gran Malvina Estantes + Cajones + Box',
      imagen: 'assets/catalogo/prod7.webp',
      descrip_corta: 'Módulo Box + estanterías con puertas (cierre suave). Blanco, mesada blanco Nature. Ruedas con freno.',
      descripcion: 'Funcionalidad y diseño en equilibrio. Esta isla de 157x50 cm de Más Nómada optimiza tu cocina, ofreciendo espacio extra sin perder estilo. Una sección de la mesada está estratégicamente diseñada para funcionar como mesa que se adapta a tu día a día.',
      precio: 480000,
      codigo: '157BNI-BA02B05',
      caracteristicas: [
        'Módulos: estanterías con puertas + box.',
        'Color Cuerpo: Blanco liso.',
        'Color Mesada: Blanco Nature, tono de blanco con un sutil veteado que imita la textura de la madera natural.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 8,
      tipo_isla: "malvina",
      nombre: 'Isla Gran Malvina MaxiCajonera',
      imagen: 'assets/catalogo/prod8.webp',
      descrip_corta: 'Módulo Box + estantería con puerta (cierre suave) + Box con cajones (cierre suave). Blanco, mesada negro Sauco. Ruedas con freno.',
      descripcion: 'Funcionalidad y diseño en equilibrio. Esta isla de 157x50 cm de Más Nómada optimiza tu cocina, ofreciendo espacio extra sin perder estilo. Una sección de la mesada está estratégicamente diseñada para funcionar como mesa que se adapta a tu día a día.',
      precio: 560000,
      codigo: '157BNI-BA02B05',
      caracteristicas: [
        'Módulos: módulo de box y estantería con puerta + módulo box con un cajón de 13x40cm y  super cajón de 25x40cm con cierre suave.',
        'Color Cuerpo: Negro Sauco, de color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina .',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 9,
      tipo_isla: "malvina",
      nombre: 'Isla Gran Malvina Estantería con puertas + Box',
      imagen: 'assets/catalogo/prod9.webp',
      descrip_corta: '2 módulos de 3 cajones (6 en total, cierre suave). Verde safari, mesada Kendal natural. Ruedas con freno.',
      descripcion: 'Funcionalidad y diseño en equilibrio. Esta isla de 157 x 50 cm de Más Nómada optimiza tu cocina, ofreciendo espacio extra sin perder estilo. Una sección de la mesada está estratégicamente diseñada para funcionar como mesa que se adapta a tu día a día.',
      precio: 640000,
      codigo: '157BNI-BA02B05',
      caracteristicas: [
        'Módulos: 4 cajones de 13x40cm y 2 cajones grandes de 25x40cm todos con cierre suave.',
        'Color cuerpo: verde safari.',
        'Color mesada: Roble Kendall Natural, Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 10,
      tipo_isla: "trinidad",
      nombre: 'Isla Trinidad Doble Cajonera + Estantería + Box',
      imagen: 'assets/catalogo/prod10.webp',
      descrip_corta: '3 módulos: 2 estanterías con puerta (cierre suave) y 1 estantería abierta. Blanco, mesada Kendal natural. Ruedas con freno.',
      descripcion: 'Está diseñada para quienes buscan el máximo. Para quienes lo quieren todo: funcionalidad, estilo y el mejor lugar para compartir. Con tres módulos, es nuestra opción más grande, el punto de encuentro donde todos querrán estar.',
      precio: 610000,
      codigo: '157KI-BA02B02C01',
      caracteristicas: [
        'Módulos: Estanterías con puertas + 3 espacios de guardado exhibidores.',
        'Color mesada: Roble Kendall Natural, Tono suave y luminoso, similar a la madera veteada, pero con un toque tenue y delicado.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 11,
      tipo_isla: "trinidad",
      nombre: 'Isla Trinidad con Estantería con y sin Puerta',
      imagen: 'assets/catalogo/prod11.webp',
      descrip_corta: '3 módulos: 2 con triple cajonera (6 cajones, cierre suave) y 1 módulo Box con puerta (cierre suave). Verde, mesada blanco Nature. Ruedas con freno.',
      descripcion: 'Está diseñada para quienes buscan el máximo. Para quienes lo quieren todo: funcionalidad, estilo y el mejor lugar para compartir. Con tres módulos, es nuestra opción más grande, el punto de encuentro donde todos querrán estar.',
      precio: 770000,
      codigo: '157BNI-SA04B05C04',
      caracteristicas: [
        'Módulos: box con puerta + 4 cajones de 13x40cm y 2 super cajones de 25x40cm todos con cierre suave.',
        'Color mesada:  Blanco Nature, tono de blanco con un sutil veteado que imita la textura de la madera.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
    {
      id: 12,
      tipo_isla: "trinidad",
      nombre: 'Isla Trinidad con Triple Cajonera',
      imagen: 'assets/catalogo/prod12.webp',
      descrip_corta: '3 módulos con triple cajonera: 6 cajones (13x40 cm) y 3 cajones (25x40 cm), todos con cierre suave. Blanco, mesada negro Sauco. Ruedas con freno.',
      descripcion: 'Está diseñada para quienes buscan el máximo. Para quienes lo quieren todo: funcionalidad, estilo y el mejor lugar para compartir. Con tres módulos, es nuestra opción más grande, el punto de encuentro donde todos querrán estar.',
      precio: 850000,
      codigo: '157SAI-BA04B04C04',
      caracteristicas: [
        'Módulos: 6 cajones de 13x40cm y 3 super cajones de 25x40cm todos con cierre suave.',
        'Color mesada: Negro Sauco, de color intenso, este diseño de madera negra quemada resalta a la perfección la textura BARK.',
        'Mesada en cascada: Sofisticada y moderna, diseñada en melamina.',
        'Ruedas de alta resistencia con freno: Mové tu isla fácilmente y adaptarla a diferentes espacios según lo necesites.'
      ]
    },
  ];
  tiposIsla: string[] = [];
  productosPorTipo: { [tipo: string]: any[] } = {};

  ngOnInit(): void {
    // Obtén una lista única de tipos de islas
    this.tiposIsla = [...new Set(this.productos.map((p) => p.tipo_isla))];

    // Agrupa los productos por tipo
    this.tiposIsla.forEach((tipo) => {
      this.productosPorTipo[tipo] = this.productos.filter(
        (producto) => producto.tipo_isla === tipo
      );
    });
  }

  constructor(private router:Router) {}

  viewProductDetails(productId: number): void {
    this.router.navigate(['/detalle-producto', productId]);
  }

}
