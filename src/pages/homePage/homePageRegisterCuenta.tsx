import axios from "axios";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuntenticationContext from "../../auth/autenticationContext";
import {
  creadencialesUsuario,
  respuestaAutenticacion,
} from "../../auth/auth.model";
import Autorizado from "../../auth/autorizado";
import HomePageComp from "../../components/homePageComp/homePageComp";
import HpRegisterCuenta from "../../components/homePageComp/hpRegisterCuenta";

export default function HomePageRegisterCuenta() {
  return (
    <>
      <Autorizado
        autorizado={
          <>
            <Navigate replace to="/" />
          </>
        }
        noAutorizado={
          <>
            <HomePageComp>
              <HpRegisterCuenta />
            </HomePageComp>
          </>
        }
      />
    </>
  );
}
