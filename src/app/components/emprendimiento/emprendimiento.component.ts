import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { SwalService } from '../../services/swal.service';
import { Venture,municipality,Category,User,Event,UsuarioEmprendimiento,EmprendimientoEvento } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrl: './emprendimiento.component.css'
})
export class EmprendimientoComponent implements OnInit{

  emprendimientos: Venture[] = [];
  municipios: municipality[] = [];
  categorias: Category[] = [];
  usuarios: User[] = [];
  eventos: Event[] = [];
  selectedEmprendimiento: Venture = {} as Venture;
  emprendimientoUsuario: UsuarioEmprendimiento = {} as UsuarioEmprendimiento;
  emprendimientoEvento: EmprendimientoEvento = {} as EmprendimientoEvento;
  selectedUsuarios: number[] = [];
  selectedEventos: number[] = [];
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(private service: ServiceService, private swal: SwalService) {}

  ngOnInit(): void {
    this.consultarEmprendimientos();
    this.consultarMunicipios();
    this.consultarCategorias();
    this.consultarUsuarios();
    this.consultarEventos();
  }

  // Consulta la lista de todos los emprendimientos
  consultarEmprendimientos(): void {
    this.isLoading = true;
    this.service.consultarEmprendimientos().subscribe({
      next: (data) => {
        this.emprendimientos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al consultar los emprendimientos:', err);
        this.isLoading = false;
        this.swal.error('Error', 'Hubo un error al consultar los usuarios');
      },
    });
  }

  consultarMunicipios(): void {
    this.service.consultarMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (err) => {
        console.error('Error al consultar los municipios:', err);
      },
    });
  }

  consultarCategorias(): void {
    this.service.consultarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al consultar las categorias:', err);
      },
    });
  }

  consultarUsuarios(): void {
    this.service.consultarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al consultar los usuarios:', err);
      },
    });
  }

  consultarEventos(): void {
    this.service.consultarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
      },
      error: (err) => {
        console.error('Error al consultar los eventos:', err);
      },
    });
  }

  // Crear un nuevo emprendimiento
  crearEmprendimiento(form: NgForm): void {
    if (form.valid) {
      this.service.crearEmprendimiento(this.selectedEmprendimiento).subscribe({
        next: (nuevoEmprendimiento) => {
          this.emprendimientos.push(nuevoEmprendimiento);
          this.asignarEmprendimientoUsuario(nuevoEmprendimiento.id);
          this.asignarEmprendimientoEvento(nuevoEmprendimiento.id);
          form.resetForm();
          this.closeModal();
          console.log('Emprendimiento creado exitosamente:', nuevoEmprendimiento);
          this.swal.success('Éxito', 'Emprendimiento creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear el emprendimiento:', err);
          this.swal.error('Error', 'Hubo un error al crear el emprendimiento');
        },
      });
    }
  }

  // Editar un emprendimiento existente
  editarEmprendimiento(form: NgForm): void {
    if (form.valid && this.selectedEmprendimiento.id) {

      this.service.editarEmprendimiento(this.selectedEmprendimiento).subscribe({
        next: (emprendimientoEditado) => {

          this.asignarEmprendimientoUsuario(emprendimientoEditado.id);
          this.asignarEmprendimientoEvento(emprendimientoEditado.id);

          const index = this.emprendimientos.findIndex(
            (emp) => emp.id === emprendimientoEditado.id
          );
          if (index !== -1) {
            this.emprendimientos[index] = { ...emprendimientoEditado };
          }
          this.closeModal();
          console.log('Emprendimiento editado exitosamente:', emprendimientoEditado);
          this.swal.success('Éxito', 'Emprendimiento editado con éxito');
        },
        error: (err) => {
          console.error('Error al editar el emprendimiento:', err);
          this.swal.error('Error', 'Hubo un error al editar el emprendimiento');
        },
      });
    }
  }

  // Eliminar un emprendimiento
  deleteEmprendimiento(id: number): void {
    this.swal
      .confirm(
        '¿Estás seguro?',
        `¿Deseas eliminar el emprendimineto con el id ${id}? No podrás revertir esta acción`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.service.borrarEmprendimiento(id).subscribe({
            next: () => {
              this.emprendimientos = this.emprendimientos.filter((emp) => emp.id !== id);
              console.log('Emprendimiento eliminado exitosamente');
              this.swal.success('Éxito', 'Emprendimiento eliminado con éxito');
            },
            error: (err) => {
              console.error('Error al eliminar el emprendimiento:', err);
              this.swal.error('Error', 'Hubo un error al eliminar el emprendimiento');
            },
          });
        }
    });
  }

  asignarEmprendimientoUsuario(id: number): void {
    const requests = this.selectedUsuarios.map(usuarioId => {
      const payload = {
        id_emprendimiento: id,
        id_usuario: usuarioId,
      };
      return this.service.asignarUsuarioEmprendimiento(payload);
    });

    forkJoin(requests).subscribe({
      next: (responses) => {
        console.log('Asignaciones completadas exitosamente:', responses);
      },
      error: (err) => {
        console.error('Error en la asignación de usuarios al emprendimiento:', err);
      },
    });

    // this.emprendimientoUsuario.id_emprendimiento = id;
    //   this.emprendimientoUsuario.id_usuario = this.selectedEmprendimiento.id_usuario;
    //   this.service.asignarUsuarioEmprendimiento(this.emprendimientoUsuario).subscribe({
    //     next: (data) => {
    //       console.log('asignacion del emprendimiento al usuario creado exitosamente:', data);
    //     },
    //     error: (err) => {
    //       console.error('Error en la asignacion del emprendimiento al usuario:', err);
    //     },
    // });
  }

  asignarEmprendimientoEvento(id: number): void {

    const requests = this.selectedEventos.map(eventoId => {
      const payload = {
        id_emprendimiento: id,
        id_evento: eventoId,
      };
      return this.service.asignarEmprendimientoEvento(payload);
    });

    forkJoin(requests).subscribe({
      next: (responses) => {
        console.log('Asignaciones completadas exitosamente:', responses);
      },
      error: (err) => {
        console.error('Error en la asignación de usuarios al emprendimiento:', err);
      },
    });

    // this.emprendimientoEvento.id_emprendimiento = id;
    // this.emprendimientoEvento.id_evento = this.selectedEmprendimiento.id_evento;
    // this.service.asignarEmprendimientoEvento(this.emprendimientoEvento).subscribe({
    //   next: (data) => {
    //     console.log('asignacion del emprendimiento al evento creado exitosamente:', data);
    //   },
    //   error: (err) => {
    //     console.error('Error en la asignacion del emprendimiento al evento:', err);
    //   },
    // });
  }

  consultarEmprendimiento(id: number): void {
      this.service.consultarEmprendimiento(id).subscribe({
        next: (data) => {
          console.log('consulta de emprendimiento:', data);
          if (data.eventosRelacionados && data.eventosRelacionados.length > 0) {
            data.id_usuario = data.eventosRelacionados[0].id_evento;
          }
          if (data.usuariosRelacionados && data.usuariosRelacionados.length > 0) {
            data.id_evento = data.usuariosRelacionados[0].id_usuario;
          }

          this.selectedEmprendimiento = { ...data };
          this.selectedUsuarios = this.selectedEmprendimiento.usuariosRelacionados
            ? this.selectedEmprendimiento.usuariosRelacionados.map(u => u.id_usuario)
            : [];
          this.selectedEventos = this.selectedEmprendimiento.eventosRelacionados
            ? this.selectedEmprendimiento.eventosRelacionados.map(u => u.id_evento)
            : [];
        },
        error: (err) => {
          console.error('Error al eliminar el emprendimiento:', err);
          this.swal.error('Error', 'Hubo un error al eliminar el emprendimiento');
        },
      });
  }

  // Abre el modal para crear o editar un emprendimiento
  openModal(emprendimiento?: Venture): void {
    if (emprendimiento) {
      this.consultarEmprendimiento(emprendimiento.id);
      this.modalEditar = true;
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.selectedEmprendimiento = {} as Venture;
      this.isModalOpen = true;
    }
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
    this.selectedEventos = [];
    this.selectedUsuarios = [];
  }

}
