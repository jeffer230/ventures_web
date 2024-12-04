import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { SwalService } from '../../services/swal.service';
import { User, municipality, rol } from '../../interfaces/interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{

  usuarios: User[] = [];
  municipios: municipality[] = [];
  roles: rol[] = [];
  selectedUsuario: User = {} as User;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(
    private userService: ServiceService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerMunicipios();
    this.obtenerRoles();
  }

  // Consulta la lista de usuarios
  obtenerUsuarios(): void {
    this.isLoading = true;
    this.userService.consultarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
        this.isLoading = false;
        this.swal.error('Error', 'Hubo un error al obtener los usuarios');
      },
    });
  }

  // Consulta la lista de municipios
  obtenerMunicipios(): void {
    this.userService.consultarMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (err) => {
        console.error('Error al obtener los municipios:', err);
        this.swal.error('Error', 'Hubo un error al obtener los municipios');
      },
    });
  }

  // Consulta la lista de roles
  obtenerRoles(): void {
    this.userService.consultarRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al obtener los roles:', err);
        this.swal.error('Error', 'Hubo un error al obtener los roles');
      },
    });
  }

  // Crear un nuevo usuario
  crearUsuario(form: NgForm): void {
    if (form.valid) {
      console.log(this.selectedUsuario);
      this.userService.crearUsuario(this.selectedUsuario).subscribe({
        next: (nuevoUsuario) => {
          this.usuarios.push(nuevoUsuario);
          form.resetForm();
          this.closeModal();
          console.log('Usuario creado exitosamente:', nuevoUsuario);
          this.swal.success('Éxito', 'Usuario creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          this.swal.error('Error', 'Hubo un error al crear el usuario');
        },
      });
    }
  }

  // Editar un usuario existente
  editarUsuario(form: NgForm): void {
    if (form.valid && this.selectedUsuario.id) {
      this.userService.editarUsuario(this.selectedUsuario).subscribe({
        next: (usuarioEditado) => {
          const index = this.usuarios.findIndex(
            (usr) => usr.id === usuarioEditado.id
          );
          if (index !== -1) {
            this.usuarios[index] = { ...usuarioEditado };
          }
          this.closeModal();
          this.swal.success('Éxito', 'Usuario editado con éxito');
        },
        error: (err) => {
          console.error('Error al editar el usuario:', err);
          this.swal.error('Error', 'Hubo un error al editar el usuario');
        },
      });
    }
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): void {
    this.swal
      .confirm(
        '¿Estás seguro?',
        `¿Deseas eliminar el usuario con el id ${id}? No podrás revertir esta acción`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.borrarUsuario(id).subscribe({
            next: () => {
              this.usuarios = this.usuarios.filter((usr) => usr.id !== id);
              this.swal.success('Eliminado', 'El usuario ha sido eliminado');
            },
            error: (err) => {
              console.error('Error al eliminar el usuario:', err);
              this.swal.error('Error', 'Hubo un error al eliminar el usuario');
            },
          });
        }
      });
  }

  // Abre el modal para crear o editar un usuario
  openModal(usuario?: User): void {
    if (usuario) {
      this.modalEditar = true;
      usuario.id_municipio = usuario.municipio?.id;
      usuario.id_rol = usuario.rol?.id;
      this.selectedUsuario = { ...usuario };
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.selectedUsuario = {} as User;
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
  }


}
