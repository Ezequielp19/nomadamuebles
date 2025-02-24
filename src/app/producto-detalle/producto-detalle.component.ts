import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoPagoService } from '../../service/mercadopago.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent implements OnInit {
  isLoading: boolean = true;
  producto: any | null = null;
  guestData = { nombre: '', email: '', telefono: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mercadoPagoService: MercadoPagoService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProductById(id);
    } else {
      this.isLoading = false;
    }
  }

  async fetchProductById(id: string): Promise<void> {
    try {
      const productRef = doc(this.firestore, 'stock', id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        this.producto = { id: productSnap.id, ...productSnap.data() };
      } else {
        console.error('Producto no encontrado en Firestore');
        this.producto = null;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      this.producto = null;
    } finally {
      this.isLoading = false;
    }
  }

  sendPaymentData(producto: any): void {
    if (!producto) {
      console.error('El producto no está definido');
      return;
    }

    const productData = {
      totalAmount: producto.precio,
      codigoFinal: producto.codigo,
      imagen: producto.imagen,
      nombre: producto.nombre,
    };

    console.log('Enviando datos del producto:', productData);

    localStorage.setItem('productData', JSON.stringify(productData));
    this.router.navigate(['/pagos']);
  }
}
