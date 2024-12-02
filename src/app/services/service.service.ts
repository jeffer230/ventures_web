import { Injectable } from '@angular/core';
import { Category,User,Event,Venture,municipality,department,rol } from '../interfaces/interface';
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
  consultarUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}usuarios`);
  }

  crearUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(`${this.url}usuarios`, usuario);
  }

  editarUsuario(usuario: User): Observable<User> {
    return this.http.put<User>(`${this.url}usuarios/${usuario.id}`, usuario);
  }

  borrarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}usuarios/${id}`);
  }


  // Emprendimientos *****************************
  consultarEmprendimientos(): Observable<Venture[]> {
    return this.http.get<Venture[]>(`${this.url}emprendimiento`);
  }

  crearEmprendimiento(emprendimiento: Venture): Observable<Venture> {
    return this.http.post<Venture>(`${this.url}emprendimiento`, emprendimiento);
  }

  editarEmprendimiento(emprendimiento: Venture): Observable<Venture> {
    return this.http.put<Venture>(`${this.url}emprendimiento/${emprendimiento.id}`, emprendimiento);
  }

  borrarEmprendimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}emprendimiento/${id}`);
  }


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
  consultarCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}categorias`);
  }

  crearCategoria(categoria: Category):Observable<Category>{
    return this.http.post<Category>(`${this.url}categorias`, categoria)
  }

  editarCategoria(categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}categorias/${categoria.id}`, categoria);
  }

  borrarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}categorias/${id}`);
  }


  // Municipios **********************************
  consultarMunicipios(): Observable<municipality[]> {
    return this.http.get<municipality[]>(`${this.url}municipios`);
  }

  consultarMunicipiosByDepartamento(id: number): Observable<municipality[]> {
    return this.http.get<municipality[]>(`${this.url}municipios/departamento/${id}`);
  }


  // Departamentos **********************************
  consultarDepartamentos(): Observable<department[]> {
    return this.http.get<department[]>(`${this.url}departamentos`);
  }


  // Roles **********************************
  consultarRoles(): Observable<rol[]> {
    return this.http.get<rol[]>(`${this.url}roles`);
  }

}
