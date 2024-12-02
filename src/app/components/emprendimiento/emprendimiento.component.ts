import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Category, Venture,municipality } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrl: './emprendimiento.component.css'
})
export class EmprendimientoComponent implements OnInit{

  emprendimientos: Venture[] = [];
  municipios: municipality[] = [];
  categorias: Category[] = [];
  selectedEmprendimiento: Venture = {} as Venture;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.consultarEmprendimientos();
    this.consultarMunicipios();
    this.consultarCategorias();
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
        console.error('Error al obtener los emprendimientos:', err);
        this.isLoading = false;
      },
    });
  }

  consultarMunicipios(): void {
    this.service.consultarMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (err) => {
        console.error('Error al obtener los municipios:', err);
      },
    });
  }

  consultarCategorias(): void {
    this.service.consultarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener las categorias:', err);
      },
    });
  }

  // Crear un nuevo emprendimiento
  crearEmprendimiento(form: NgForm): void {
    if (form.valid) {
      this.service.crearEmprendimiento(this.selectedEmprendimiento).subscribe({
        next: (nuevoEmprendimiento) => {
          this.emprendimientos.push(nuevoEmprendimiento);
          form.resetForm();
          this.closeModal();
          console.log('Emprendimiento creado exitosamente:', nuevoEmprendimiento);
          alert('Emprendimiento creado con éxito');
        },
        error: (err) => {
          console.error('Error al crear el emprendimiento:', err);
          alert('Hubo un error al crear el emprendimiento');
        },
      });
    }
  }

  // Editar un emprendimiento existente
  editarEmprendimiento(form: NgForm): void {
    if (form.valid && this.selectedEmprendimiento.id) {

      this.service.editarEmprendimiento(this.selectedEmprendimiento).subscribe({
        next: (emprendimientoEditado) => {
          const index = this.emprendimientos.findIndex(
            (emp) => emp.id === emprendimientoEditado.id
          );
          if (index !== -1) {
            this.emprendimientos[index] = { ...emprendimientoEditado };
          }
          this.closeModal();
          console.log('Emprendimiento editado exitosamente:', emprendimientoEditado);
          alert('Emprendimiento editado con éxito');
        },
        error: (err) => {
          console.error('Error al editar el emprendimiento:', err);
          alert('Hubo un error al editar el emprendimiento');
        },
      });
    }
  }

  // Eliminar un emprendimiento
  deleteEmprendimiento(id: number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el emprendimiento con el id ${id}?`)) {
      this.service.borrarEmprendimiento(id).subscribe({
        next: () => {
          this.emprendimientos = this.emprendimientos.filter((emp) => emp.id !== id);
          alert('Emprendimiento eliminado con éxito');
          console.log('Emprendimiento eliminado exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar el emprendimiento:', err);
          alert('Hubo un error al eliminar el emprendimiento');
        },
      });
    }
  }

  // Abre el modal para crear o editar un emprendimiento
  openModal(emprendimiento?: Venture): void {
    if (emprendimiento) {
      this.modalEditar = true;
      emprendimiento.id_municipio = emprendimiento.municipio?.id;
      emprendimiento.id_categoria = emprendimiento.categoria?.id;
      this.selectedEmprendimiento = { ...emprendimiento };
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
  }

}
