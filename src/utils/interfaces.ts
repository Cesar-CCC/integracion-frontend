import { number, string } from "yup";

export interface moduleSGCProps {
  nombre: string;
  estado: string;
  etapa: string;
  navigate: string;
  bgBadgeEstado?: string;
  bgBadgeEtapa?: string;
}
export interface regisFace {
  email: string;
  names: string;
}
export interface usuarioDTO {
  id: string;
  nombres: string;
  apPaterno: string;
  apMaterno: string;
  dni: string;
  fechaNacimiento: string;
  celular: string;
  email?: string;
  facultad: string;
  periodoFK: string | undefined;
}
export interface usuario {
  nombres: string;
  apPaterno: string;
  apMaterno: string;
  dni: string;
  fechaNacimiento: string;
  celular: string;
  email?: string;
  // password: string | undefined;
  // confirmarPassword: string | undefined;
  facultad: string;
  periodoFK: string | undefined;
  contratos: contratos[];
  cuentasDocentes: cuentasDocentes[];
  reclamos: reclamos[];
}
export interface contratos {
  id: string;
  modalidadContrato: number;
  estadoContrato: number;
  usuarioFK: string;
}
export interface cuentasDocentes {
  id: string;
  CorreoInstitucional: string;
  CuentaAulaVirtual: boolean;
  UsuarioFK: string;
}
export interface reclamos {
  id: string;
  reclamoDocente: string;
  fechaReclamo: string;
  respuesta: string;
  fechaRespuesta: string;
  usuarioFK: string;
}
// export interface usuarioDatosDTO {
//   nombres: string;
//   apPaterno: string;
//   apMaterno: string;
//   dni: string;
//   fechaNacimiento: string;
//   celular: string;
//   facultad: string;
// }
export interface periodoDTO {
  id: string;
  nombrePeriodo: string;
  comunicado: string;
  estadoPeriodo: number;
  etapaDirecto: number;
  modoClasificación: number;
  etapaConcursoFK: string;
}
export interface etapaPeriodoDTO {
  id: string;
  nombreEtapa: number;
  duracionEtapa: number;
  etapaAccion: number;
}
//-
export interface formCRUDUsuarioProps {
  editar: boolean | undefined;
  paraAdministrador: boolean;
  idUsuario: string | undefined;
  idPeriodo?: string | undefined;
  usuarioDatosEdit?: usuarioDTO;
}
