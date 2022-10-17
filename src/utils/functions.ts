import axios from "axios";
import { claim, creadencialesUsuario } from "../auth/auth.model";
import { urlobtenerIdPeriodoActivo } from "./endpopints";
import { usuarioDTO } from "./interfaces";

export function esAdmin(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "role" && claim.valor === "admin"
    ) > -1
  );
}
//--------
export function tienePrmsPeriodo(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "permisoPeriodo" && claim.valor === "todo"
    ) > -1
  );
}
export function tienePrmsDocenteTodo(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "permisoDocente" && claim.valor === "todo"
    ) > -1
  );
}
export function tienePrmsDocenteFac(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "permisoDocente" && claim.valor === "facultad"
    ) > -1
  );
}
export function tienePrmsReclamo(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "permisoReclamo" && claim.valor === "todo"
    ) > -1
  );
}
export function tienePrmsCuenta(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) => claim.nombre === "permisoCuentas " && claim.valor === "todo"
    ) > -1
  );
}
export function tienePrmsFechaCmb(_claims: claim[]) {
  return (
    _claims.findIndex(
      (claim) =>
        claim.nombre === "permisofechaCambio  " && claim.valor === "todo"
    ) > -1
  );
}
//---------------------------------------

// export function registrarUsuarioEnAdmin(valores: any) {
//   const usarioDatos: usuarioDatosDTO = {
//     id: "",
//     nombres: valores.nombres,
//     apPaterno: valores.apPaterno,
//     apMaterno: valores.apMaterno,
//     dni: valores.dni,
//     fechaNacimiento: valores.fechaNacimiento,
//     celular: valores.celular,
//     email: valores.email,
//     facultad: valores.facultad,
//     idPeriodo: "sdf",
//   };
//   const usuarioCuenta: creadencialesUsuario = {
//     email: valores.email,
//     password: valores.password,
//   };
//   // await registrarCuenta(usuarioCuenta);
//   // await registrarUsuaioDatos(usarioDatos);
//   //-----------------
//   // hacerAdmin(valores.email);
//   return [usuarioCuenta, usarioDatos];
//   //--------------
// }
