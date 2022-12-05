import { number, string } from "yup";

export interface regisFace {
  email: string;
  names: string;
}
export interface nCompletoFace {
  nombres?: string;
  apPaterno?: string;
  apMaterno?: string;
}
export interface productoGet{
  id: string;
  nombre: string;
  enlaceImagen: string;
  precio: string;
}
export interface productoPostPut{
  nombre: string;
  enlaceImagen: string;
  precio: Float32Array;
}
