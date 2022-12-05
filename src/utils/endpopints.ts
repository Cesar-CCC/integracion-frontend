const apiURL = process.env.REACT_APP_API_URL;

export const urlregistrarCuenta = `${apiURL}/cuentas/registrarCuenta`;
export const urlactualizar = `${apiURL}/cuentas/actualizar`;
export const urllogin = `${apiURL}/cuentas/login`;

export const urlobtenerProductos = `${apiURL}/producto/obtenerProductos`;
export const urlcrearProducto = `${apiURL}/producto/crearProducto`;
export const urlactualizarProducto = `${apiURL}/producto/actualizarProducto`;
export const urleliminarProducto = `${apiURL}/producto/eliminarProducto`;
//---------------------- NUEVOS ENDPOINTS
export const urlobtenerIdPeriodoActivo = `${apiURL}/cuentas/obtenerIdPeriodoActivo`; //nuevo
export const urlobtenerClaimsUserAdmin = `${apiURL}/cuentas/obtenerClaimsUserAdmin`; //nuevo
