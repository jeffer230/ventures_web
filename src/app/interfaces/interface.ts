export interface User{
    id: number,
    cedula: string,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    contrasena: string | undefined,
    id_municipio: number | undefined,
    id_rol: number | undefined,
    estado: number | undefined,
}

export interface Category{
    id: number,
    nombre: string,
    descripcion: string,
}

