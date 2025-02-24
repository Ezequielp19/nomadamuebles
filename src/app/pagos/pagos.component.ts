import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MercadoPagoService } from '../../service/mercadopago.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, FormsModule, DecimalPipe],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements OnInit {
  productData: any;
  isFormComplete: boolean = false;
  isLoading: boolean = false;
  discountCode: string = ''; // Código de descuento ingresado
  discountAmount: number = 0; // Valor del descuento aplicado
  showWarning: boolean = false;
  selectedDeliveryMethod: string | null = null;
  showDeliveryWarning: boolean = false;
  totalAmount: number = 0; // Precio total con descuento aplicado
  invalidCoupon: boolean = false;

  discountApplied: boolean = false; // Indica si el descuento fue aplicado
  discountedTotal: number = 0; // Precio con descuento

  readonly DESCUENTO = 0.14;

  userFormData = {
    pais: 'Argentina',
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    direccion: '',
    departamento: ''
  };

  constructor(private router: Router, private mercadoPagoService: MercadoPagoService, private firestore: Firestore) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('productData');
    if (storedData) {
      this.productData = JSON.parse(storedData);
      this.totalAmount = this.productData.totalAmount;

      // Crear una copia para los campos editables
      this.userFormData = {
        pais: 'Argentina',
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        ciudad: '',
        provincia: '',
        codigoPostal: '',
        direccion:'',
        departamento: ''
      };

      console.log('Datos recuperados de localStorage:', this.productData);
    } else {
      console.error('No se recibieron datos del producto');
    }

    if (this.productData) {
      this.calcularPrecioConDescuento();
    }
  }

    // Aplica el descuento a todos los productos automáticamente
  calcularPrecioConDescuento() {
    this.discountAmount = this.productData.totalAmount * this.DESCUENTO;
    this.discountedTotal = this.productData.totalAmount * (1 - this.DESCUENTO);
    this.discountedTotal = Number(this.discountedTotal.toFixed(2)); // Redondear a 2 decimales
  }

  setDeliveryMethod(method: string) {
    this.selectedDeliveryMethod = method;
    this.showDeliveryWarning = false; // Oculta la advertencia si el usuario elige una opción
    this.validateForm();
  }

  validateForm() {
    this.isFormComplete =
      !!this.selectedDeliveryMethod &&
      this.userFormData.dni.trim() !== '' &&
      this.userFormData.nombre.trim() !== '' &&
      this.userFormData.apellido.trim() !== '' &&
      this.userFormData.email.trim() !== '' &&
      this.userFormData.telefono.trim() !== '' &&
      this.userFormData.ciudad.trim() !== '' &&
      this.userFormData.provincia.trim() !== '' &&
      this.userFormData.codigoPostal.trim() !== '' &&
      this.userFormData.direccion.trim() !== ''
  }

  attemptPayment(userForm: NgForm) {
    this.validateForm(); // Asegurar que se valida antes del pago

    if (!this.selectedDeliveryMethod) {
      this.showDeliveryWarning = true; // Muestra advertencia si no hay selección
    }

    if (!this.isFormComplete || !userForm.valid || !this.selectedDeliveryMethod) {
      this.showWarning = true;
      return;
    }

    this.processPayment();
}


processPayment(): void {
  this.isLoading = true;

  const paymentData = {
    totalAmount: this.discountedTotal, // Usamos el precio con descuento
    codigoFinal: this.productData.codigoFinal,
    nombreProducto: this.productData.nombre,
    deliveryMethod: this.selectedDeliveryMethod,
    discountAmount: this.discountAmount, // Mantenemos el valor del descuento
    userData: { ...this.userFormData },
  };

  this.mercadoPagoService.sendPaymentData(paymentData).subscribe(
    (response: any) => {
      this.isLoading = false;

      if (response.init_point) {
        window.location.href = response.init_point;
      } else {
        console.error('Error en la respuesta del servidor:', response);
      }
    },
    (error: any) => {
      this.isLoading = false;
      console.error('Error al enviar el pago', error);
    }
  );
}

}
