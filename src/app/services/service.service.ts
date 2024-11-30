import { Injectable } from '@angular/core';
import { Category,User,Event } from '../interfaces/interface';
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
  consultarEventos(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}evento`);
  }

  crearEvento(evento: Event): Observable<Event> {
    return this.http.post<Event>(`${this.url}evento`, evento);
  }

  editarEvento(evento: Event): Observable<Event> {
    return this.http.put<Event>(`${this.url}evento/${evento.id}`, evento);
  }

  borrarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}evento/${id}`);
  }


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
