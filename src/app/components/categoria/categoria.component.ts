import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Category } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Category[] = [];
  selectedCategory: Category = {} as Category;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(private categoryService: ServiceService) {}

  ngOnInit(): void {
   this.obtenerCategorias();
  }

  // consulta la lista de todas las categorías
  obtenerCategorias(): void {
    this.categoryService.consultarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
         this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        this.isLoading = false;
      },
    });
  }

  // Crear una nueva categoría
  crearCategoria(form: NgForm): void {
    if (form.valid) {
      this.categoryService.crearCategoria(this.selectedCategory).subscribe({
        next: (nuevaCategoria) => {
          this.categorias.push(nuevaCategoria);
          form.resetForm();
          this.closeModal();
          console.log('Categoría creada exitosamente:', nuevaCategoria);
          alert('Categoría creada con éxito');
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          alert('Hubo un error al crear la categoría');
        },
      });
    }
  }

  // Editar una categoría existente
  editarCategoria(form: NgForm): void {
    if (form.valid && this.selectedCategory.id) {
      this.categoryService.editarCategoria(this.selectedCategory).subscribe({
        next: (data) => {
          const index = this.categorias.findIndex(
            (cat) => cat.id === data.id
          );
          if (index !== -1) {
            this.categorias[index] = { ...data  };
          }
          this.closeModal();
          console.log('Categoría editada exitosamente:', data);
          alert('Categoría editada con éxito');
        },
        error: (err) => {
          console.error('Error al editar la categoría:', err);
          alert('Hubo un error al editar la categoría');
        },
      });
    }
  }

  deleteCategoria(id: number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoria con el id ${id}?`)) {

       this.categoryService.borrarCategoria(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter((cat) => cat.id !== id);
          alert('Categoria eliminada con éxito');
          console.log('Categoría eliminada exitosamente');
        },
        error: (err) => {
          alert('Hubo un error al eliminar la categoria');
          console.error('Error al eliminar la categoría:', err);
        },
      });
    }
   }

  openModal(categoria?: Category): void {
    if (categoria) {
      this.modalEditar = true;
      this.selectedCategory = { ...categoria };
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
  }


}
