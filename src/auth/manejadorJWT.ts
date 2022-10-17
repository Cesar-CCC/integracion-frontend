import { claim, respuestaAutenticacion } from "./auth.model";

const llaveToken = "token";
const llaveExpiracion = "token-expiracion";
const names = "nombres";
export function guardarTokenLocalStorage(
  autenticacion: respuestaAutenticacion
) {
  localStorage.setItem(llaveToken, autenticacion.token);
  localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
  localStorage.setItem(names, autenticacion.names);
}

export function obtenerClaims(): claim[] {
  const token = localStorage.getItem(llaveToken);
  if (!token) {
    return [];
  }

  // Colocar ! al final ara castear a string.
  const expiracion = localStorage.getItem(llaveExpiracion)!;
  const expiracionFecha = new Date(expiracion);

  if (expiracionFecha <= new Date()) {
    logout();
    return [];
  }

  const dataToken = JSON.parse(window.atob(token.split(".")[1]));
  const respuesta: claim[] = [];
  for (const prioridad in dataToken) {
    respuesta.push({ nombre: prioridad, valor: dataToken[prioridad] });
  }
  return respuesta;
}

export function logout() {
  localStorage.removeItem(llaveToken);
  localStorage.removeItem(llaveExpiracion);
  localStorage.removeItem(names);
}

export function obtenerToken(){
  return localStorage.getItem(llaveToken);
}

export function obtenerNames(){
  return localStorage.getItem(names);
}
