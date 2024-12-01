import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  // Método para mostrar alertas de éxito
  success(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  // Método para mostrar alertas de error
  error(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  // Método para mostrar alertas de advertencia
  warning(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }

  // Método para confirmaciones (sí o no)
  confirm(title: string, text: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });
  }

  // Método personalizado que permite configurar cualquier SweetAlert
  custom(options: SweetAlertOptions): Promise<any> {
    return Swal.fire(options);
  }

}
