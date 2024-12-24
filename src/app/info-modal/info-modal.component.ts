import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent {
  @Input() title: string = ''; // Título del modal
  @Input() content: string[] = []; // Contenido del modal dividido en líneas

  // Método para cerrar el modal
  closeModal() {
    const modalElement = document.querySelector('.modal-container');
    if (modalElement) {
      modalElement.classList.add('hide-modal'); // Animación opcional para cerrar
    }
    setTimeout(() => {
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) overlay.remove();
      modalElement?.remove();
    }, 300);
  }
}


