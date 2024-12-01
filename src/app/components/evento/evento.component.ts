import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { SwalService } from '../../services/swal.service';
import { Event, municipality } from '../../interfaces/interface';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
  providers: [DatePipe]
})
export class EventoComponent implements OnInit {

  eventos: Event[] = [];
  municipios: municipality[] = [];
  selectedEvento: Event = {} as Event;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(private eventService: ServiceService,
    private datePipe: DatePipe,
    private swal: SwalService) {}

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerMunicipios();
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
        this.swal.error('Error', 'Hubo un error al obtener los eventos');
      },
    });
  }

  // Consulta la lista de municipios
  obtenerMunicipios(): void {
    this.eventService.consultarMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (err) => {
        console.error('Error al obtener los municipios:', err);
        this.swal.error('Error', 'Hubo un error al obtener los municipios');
      },
    });
  }

  // Crear un nuevo evento
  crearEvento(form: NgForm): void {
    if (form.valid) {

      // Ajustar la fecha al formato esperado por el backend
      this.selectedEvento.fecha = this.formatFechaGuardar(this.selectedEvento.fecha);

      this.eventService.crearEvento(this.selectedEvento).subscribe({
        next: (nuevoEvento) => {
          this.eventos.push(nuevoEvento);
          form.resetForm();
          this.closeModal();
          console.log('Evento creado exitosamente:', nuevoEvento);
          this.swal.success('Éxito', 'Evento creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          this.swal.error('Error', 'Hubo un error al crear el evento');
        },
      });
    }
  }

  // Editar un evento existente
  editarEvento(form: NgForm): void {
    if (form.valid && this.selectedEvento.id) {
      // Ajustar la fecha al formato esperado por el backend
      this.selectedEvento.fecha = this.formatFechaGuardar(this.selectedEvento.fecha);

      this.eventService.editarEvento(this.selectedEvento).subscribe({
        next: (data) => {
          const index = this.eventos.findIndex((evt) => evt.id === data.id);
          if (index !== -1) {
            this.eventos[index] = { ...data };
          }
          this.closeModal();
          console.log('Evento editado exitosamente:', data);
          this.swal.success('Éxito', 'Evento editado con éxito');
        },
        error: (err) => {
          console.error('Error al editar el evento:', err);
          this.swal.error('Error', 'Hubo un error al editar el evento');
        },
      });
    }
  }

  borrarEvento(id: number): void {
    this.swal.confirm('¿Estás seguro?', `¿De eliminar el evento con el id ${id} No podrás revertir esta acción?`).then((result) => {
      if (result.isConfirmed) {
        this.eventService.borrarEvento(id).subscribe({
          next: () => {
            this.eventos = this.eventos.filter((evt) => evt.id !== id);
            console.log('Evento eliminado exitosamente');
            this.swal.success('Eliminado', 'El evento ha sido eliminado');
          },
          error: (err) => {
            console.error('Error al eliminar el evento:', err);
            this.swal.error('Error', 'Hubo un error al eliminar el evento');
          },
        });
      }
    });
  }

  // Abre el modal para crear o editar un evento
  openModal(evento?: Event): void {
    if (evento) {
      this.modalEditar = true;
      evento.id_municipio = evento.municipio?.id;
      // Ajusta la fecha al formato compatible con el input datetime-local
      let date = this.formatFechaInput(evento.fecha);
      this.selectedEvento = { ...evento, fecha: date };
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.selectedEvento = {} as Event;
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
  }

  private formatFechaGuardar(fecha: string): string {
    return fecha ? `${fecha}:00` : '';
  }

  formatFechaInput(fecha: string): string {
    return fecha ? fecha.slice(0, 16) : '';
  }

}
