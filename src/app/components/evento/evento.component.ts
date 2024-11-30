import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Event } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit {

  eventos: Event[] = [];
  selectedEvento: Event = {} as Event;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(private eventService: ServiceService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  // Consulta la lista de todos los eventos
  obtenerEventos(): void {
    this.isLoading = true;
    this.eventService.consultarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener los eventos:', err);
        this.isLoading = false;
      },
    });
  }

  // Crear un nuevo evento
  crearEvento(form: NgForm): void {
    if (form.valid) {
      this.eventService.crearEvento(this.selectedEvento).subscribe({
        next: (nuevoEvento) => {
          this.eventos.push(nuevoEvento);
          form.resetForm();
          this.closeModal();
          console.log('Evento creado exitosamente:', nuevoEvento);
          alert('Evento creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          alert('Hubo un error al crear el evento');
        },
      });
    }
  }

  // Editar un evento existente
  editarEvento(form: NgForm): void {
    if (form.valid && this.selectedEvento.id) {
      this.eventService.editarEvento(this.selectedEvento).subscribe({
        next: (eventoEditado) => {
          const index = this.eventos.findIndex((evt) => evt.id === eventoEditado.id);
          if (index !== -1) {
            this.eventos[index] = { ...eventoEditado };
          }
          this.closeModal();
          console.log('Evento editado exitosamente:', eventoEditado);
          alert('Evento editado con éxito');
        },
        error: (err) => {
          console.error('Error al editar el evento:', err);
          alert('Hubo un error al editar el evento');
        },
      });
    }
  }

  // Eliminar un evento
  deleteEvento(id: number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el evento con el id ${id}?`)) {
      this.eventService.borrarEvento(id).subscribe({
        next: () => {
          this.eventos = this.eventos.filter((evt) => evt.id !== id);
          alert('Evento eliminado con éxito');
          console.log('Evento eliminado exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
          alert('Hubo un error al eliminar el evento');
        },
      });
    }
  }

  // Abre el modal para crear o editar un evento
  openModal(evento?: Event): void {
    if (evento) {
      this.modalEditar = true;
      this.selectedEvento = { ...evento };
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.selectedEvento = {} as Event;
      this.isModalOpen = true;
    }
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
  }

}
