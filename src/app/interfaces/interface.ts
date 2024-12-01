export interface User{
    id: number,
    cedula: string,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    contrasena: string | undefined,
    id_municipio: number | undefined,
    municipio?: municipality,
    id_rol: number | undefined,
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
  municipio?: municipality,
  categoria?: Category,
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
