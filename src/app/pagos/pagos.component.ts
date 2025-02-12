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
  totalAmount: number = 0; // Precio total con descuento aplicado
  invalidCoupon: boolean = false;

  discountApplied: boolean = false; // Indica si el descuento fue aplicado
  discountedTotal: number = 0; // Precio con descuento

  userFormData = {
    pais: 'Argentina',
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
    codigoPostal: '',
    provincia: '',
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
        codigoPostal: '',
        provincia: '',
        departamento: ''
      };

      console.log('Datos recuperados de localStorage:', this.productData);
    } else {
      console.error('No se recibieron datos del producto');
    }
  }


  async validateCoupon() {
    if (!this.discountCode.trim()) {
      this.invalidCoupon = false;
      this.discountAmount = 0;
      this.totalAmount = this.productData.totalAmount;
      return;
    }

    const cuponRef = collection(this.firestore, 'cupon');
    const q = query(cuponRef, where('codigo', '==', this.discountCode.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cuponData = querySnapshot.docs[0].data();
      this.discountAmount = cuponData['valor'];
      this.totalAmount = this.productData.totalAmount * (1 - this.discountAmount / 100);
      this.invalidCoupon = false;
    } else {
      this.invalidCoupon = true;
      this.discountAmount = 0;
      this.totalAmount = this.productData.totalAmount;
    }
  }

  setDeliveryMethod(method: string) {
    this.selectedDeliveryMethod = method;
    this.validateForm();
  }

  async applyDiscount() {
    if (!this.discountCode.trim()) {
      this.invalidCoupon = false;
      this.discountAmount = 0;
      this.discountedTotal = this.productData.totalAmount;
      this.discountApplied = false;
      this.validateForm(); // Verificar después de aplicar el cupón
      return;
    }

    const cuponRef = collection(this.firestore, 'cupon');
    const q = query(cuponRef, where('codigo', '==', this.discountCode.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cuponData = querySnapshot.docs[0].data();
      this.discountAmount = cuponData['valor'];

      // Calculamos el total con descuento y redondeamos a 3 decimales
      this.discountedTotal = Number((this.productData.totalAmount * (1 - this.discountAmount / 100)).toFixed(3));

      this.invalidCoupon = false;
      this.discountApplied = true;
    } else {
      this.invalidCoupon = true;
      this.discountAmount = 0;
      this.discountedTotal = this.productData.totalAmount;
      this.discountApplied = false;
    }
    this.validateForm(); // Verificar después de aplicar el cupón
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
      this.userFormData.codigoPostal.trim() !== '' &&
      this.userFormData.provincia.trim() !== '';
  }

attemptPayment(userForm: NgForm) {
    this.validateForm(); // Asegurar que se valida antes del pago
    if (!this.isFormComplete || !userForm.valid) {
      this.showWarning = true;
      return;
    }
    this.processPayment();
}


  processPayment(): void {
    this.isLoading = true;

    const paymentData = {
      totalAmount: this.totalAmount,
      codigoFinal: this.productData.codigoFinal,
      nombreProducto: this.productData.nombre,
      deliveryMethod: this.selectedDeliveryMethod,
      discountAmount: this.discountAmount,
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
