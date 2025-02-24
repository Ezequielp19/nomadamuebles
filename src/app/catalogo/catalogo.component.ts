import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs, CollectionReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  productos: any[] = [];
  tiposIsla: string[] = [];
  productosPorTipo: { [tipo: string]: any[] } = {};

  constructor(private router: Router, private firestore: Firestore) {}

  async ngOnInit(): Promise<void> {
    await this.obtenerProductosDesdeFirestore();
  }

  async obtenerProductosDesdeFirestore(): Promise<void> {
    try {
      const productosRef: CollectionReference = collection(this.firestore, 'stock');
      const querySnapshot = await getDocs(productosRef);

      this.productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Obtén una lista única de tipos de islas
      this.tiposIsla = [...new Set(this.productos.map((p) => p.tipo_isla))];

      // Agrupa los productos por tipo
      this.tiposIsla.forEach((tipo) => {
        this.productosPorTipo[tipo] = this.productos.filter(
          (producto) => producto.tipo_isla === tipo
        );
      });
    } catch (error) {
      console.error('Error obteniendo productos de Firestore:', error);
    }
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/detalle-producto', productId]);
  }
}
