import { Injectable } from '@angular/core';
import { Category,User } from '../interfaces/interface';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  // Usuarios ************************************

  // Emprendimientos *****************************

  // Eventos ************************************


  // Categorias **********************************
  // consulta la lista de todas las categorías
  consultarCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}categorias`);
  }

  // crear una categoria
  crearCategoria(categoria: Category):Observable<Category>{
    return this.http.post<Category>(`${this.url}categorias`, categoria)
  }

  // editar una categoria
  editarCategoria(categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}categorias/${categoria.id}`, categoria);
  }

  // Eliminar una categoria
  borrarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}categorias/${id}`);
  }





}
