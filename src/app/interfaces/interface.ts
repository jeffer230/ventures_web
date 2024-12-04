export interface User{
    id: number,
    cedula: string,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    password: string | undefined,
    id_municipio: number | undefined,
    id_rol: number | undefined,
    municipio?: municipality,
    rol?: rol,
    estado: number | undefined,
}

export interface rol{
    id: number,
    nombre: string,
}

export interface permission{
    id: number,
    nombre: string,
    descripcion: string,
}

export interface Event{
    id: number,
    nombre: string,
    fecha:string,
    id_municipio: number | undefined,
    municipio?: municipality,
    direccion: string,
    descripcion: string,
}

export interface Venture {
  id: number,
  codigo: string,
  nombre: string,
  descripcion: string,
  id_municipio: number | undefined,
  id_categoria: number | undefined,
  id_usuario: number | undefined,
  id_evento: number | undefined,
  municipio?: municipality,
  categoria?: Category,
  UsuarioEmprendimiento?: UsuarioEmprendimiento,
  emprendimientoEvento?: EmprendimientoEvento,

  eventosRelacionados?: EventoRelacionado[];
  usuariosRelacionados?: UsuarioRelacionado[];
}

export interface Category{
    id: number,
    nombre: string,
    descripcion: string,
}

export interface department{
    id: number,
    codigo: string,
    nombre: string,
}

export interface municipality{
    id: number,
    codigo: string,
    nombre: string,
    id_departamento: number | undefined,
}

export interface UsuarioEmprendimiento {
    id_usuario: number | undefined,
    id_emprendimiento: number | undefined,
}

export interface EmprendimientoEvento {
   id_evento : number | undefined,
   id_emprendimiento : number | undefined,
}

export interface EventoRelacionado {
  id_evento: number;
  nombre_evento: string;
}

export interface UsuarioRelacionado {
  id_usuario: number;
  nombre_usuario: string;
}
