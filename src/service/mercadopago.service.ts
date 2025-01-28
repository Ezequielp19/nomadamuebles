import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://backnomada.onrender.com/create_preference';

  constructor(private http: HttpClient,
   ) {}

  // Método para enviar la orden de pago al servidor backend
  sendPaymentData(paymentData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, paymentData);
  }
}


