import HomePage from "../pages/homePage/homePage";
import HomePageLogin from "../pages/homePage/homePageLogin";
import HomePageRegisterCuenta from "../pages/homePage/homePageRegisterCuenta";
import NotFound from "./notFound";
const routeSGC = [
    {path: '/', element: HomePage},
    {path: '/homepage/login', element: HomePageLogin},
    // {path: '/docente', element: Docente},
    // {path: '/administrador', element: AdminInicio, esAdmin: false},
    // {path: '/administrador/periodos', element: AdminPeriodos, esAdmin: false},
    // {path: '/administrador/docentes/:idPeriodo', element: AdminDocentes, esAdmin: false},
    // {path: '/administrador/cuentas', element: AdminCuentas, esAdmin: false},
    {path: '*', element: NotFound}
]
export default routeSGC;
