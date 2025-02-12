import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nomadamuebles';

  shareFurnitureLink(): void {
    const numeroWhatsApp = "5491131387808"; // Reemplaza con el número de WhatsApp del asesor
    const mensaje = `Hola, me gustaría obtener más información. ¿Podría ayudarme, por favor?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
}
