import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://backnomada.onrender.com/create_preference';

  constructor(private http: HttpClient, private injector: Injector,
     private firestore: AngularFirestore) {
    // Lazy load AngularFirestore to avoid circular dependencies
    setTimeout(() => this.firestore = this.injector.get(AngularFirestore));
  }

  // Método para enviar la orden de pago al servidor backend
  sendPaymentData(paymentData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, paymentData);
  }
}


