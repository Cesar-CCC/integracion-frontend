import { Field, Form, Formik } from "formik";
import { Button, Container } from "react-bootstrap";
import HPButton from "./hpButton";
import HPInput from "./hpInput";
import homePageCSS from "../../styles/homePage.module.css";
import { useNavigate } from "react-router-dom";
import {
  creadencialesUsuario,
  respuestaAutenticacion,
} from "../../auth/auth.model";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import AuntenticationContext from "../../auth/autenticationContext";
import {
  guardarTokenLocalStorage,
  obtenerClaims,
} from "../../auth/manejadorJWT";
// import { urlCantidadUsuario, urlListaUsuarios, urlRegistrarCuenta, urlRegistrarDatos } from "../../utils/endpopints";
import { urlregistrarCuenta } from "../../utils/endpopints";
import { usuario } from "../../utils/interfaces";
export default function HpRegisterDatos(props: hpRegisterDatosProps) {
  const navigate1 = useNavigate();
  //-----------------------------
  const { actualizarClaims: actualizar } = useContext(AuntenticationContext);
  // async function registrarCreds() {
  //   try {
  //     const respuesta = await axios.post<respuestaAutenticacion>(
  //       urlregistrarCuenta,
  //       props.credencialesRegis
  //     );
  //     guardarTokenLocalStorage(respuesta.data);
  //     actualizar(obtenerClaims());
  //     console.log(respuesta.data);
  //     // navigate1("/homepage/register/datos");
  //     console.log("------------");
  //     // console.log(obtenerClaims())
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function registrarUsuaioDatos(registro: usuario) {
    try {
      const respuesta = await axios.post(
        urlregistrarCuenta,
        registro,
        // Solo se utilizara idUsuario
        { params: { "idusuario": "solo", "idregistro": "", "idperiodo": "" } },
      );
      //respuesta.data.headers['Content-Type']; // text/json
      console.log(respuesta.status);
      // if (respuesta.status == 204) {
      //   registrarCreds();   // Registrando credenciales.
      //   console.log("Usuario registrado");
      // }
      // else {
      //   console.log("Error en datos");
      // }
      navigate1("/homepage/register/datos");
    } catch (error) {
      console.log(error);
    }
  }
  //********************************  */
  //---------------------------------------------
  const [cantidadUsuarios, cantidadUsuariosState] = useState(0);
  // useEffect(() => {
  //   axios.get(urlcantidadUsuarios)
  //     .then((respuesta: AxiosResponse<number>) => {
  //       cantidadUsuariosState(respuesta.data);
  //       console.log(respuesta.data);
  //     })
  // }, [])
  function construirUsuario(valor: any) {
    const registro: usuario = {
      //id: "usuarioSGC" + cantidadUsuarios,
      nombres: valor.nombres,
      apPaterno: valor.apPaterno,
      apMaterno: valor.apMaterno,
      dni: valor.dni,
      fechaNacimiento: valor.fechaNacimiento,
      celular: valor.celular,
      email: props.credencialesRegis?.email,
      // password: props.credencialesRegis?.password,
      // confirmarPassword: props.credencialesRegis?.password,
      facultad: valor.facultad,
      periodoFK: props.idPeriodo,
      contratos: [{
        id: "", modalidadContrato: 0,
        estadoContrato: 0,
        usuarioFK: ""
      }],
      cuentasDocentes: [{
        id: "",
        CorreoInstitucional: "",
        CuentaAulaVirtual: false,
        UsuarioFK: ""
      }],
      reclamos: [{
        id: "",
        reclamoDocente: "",
        fechaReclamo: "",
        respuesta: "",
        fechaRespuesta: "",
        usuarioFK: ""
      }],
    };
    console.log(registro);
    registrarUsuaioDatos(registro);
  }

  return (
    // <div className="mt-5 col-sm-12 col-md-8 col-lg-5 col-xl-5 col-xxl-4 mx-auto position-relative">
    <div>
      <Formik
        initialValues={{
          nombres: null,
          apPaterno: null,
          apMaterno: null,
          dni: null,
          fechaNacimiento: null,
          celular: null,
          facultad: "FACULTAD DE TRABAJO SOCIAL",
        }}
        onSubmit={(valor) => {
          //console.log(valor);
          construirUsuario(valor);
          //---No debe de estar aquí esta navegación. Test
          // navigate1("/homepage");
        }}
      >
        {(formikProps) => (
          <Form className="p-5 sgcForm">
            <h3>Registrarse</h3>
            <br />
            <HPInput
              type="text"
              name="nombres"
              placeholder="Ingrese su nombres"
            />
            <HPInput
              type="text"
              name="apPaterno"
              placeholder="Ingrese su apellidoPaterno"
            />
            <HPInput
              type="text"
              name="apMaterno"
              placeholder="Ingrese su apellidoMaterno"
            />
            <HPInput type="text" name="dni" placeholder="Ingrese su dni" />
            <HPInput type="date" name="fechaNacimiento" placeholder="" />
            <HPInput type="text" name="celular" placeholder="Ingrese s número de celular" />
            {/* <HPInput type="select" name="facultad" placeholder="Ingrese su facultad" /> */}
            <Field as="select" name="facultad" value="FACULTAD DE TRABAJO SOCIAL" className="w-100 bg-dark border-none text-secondary p-2 mt-4">
              <option value="FACULTAD DE TRABAJO SOCIAL">FACULTAD DE TRABAJO SOCIAL</option>
              <option value="FACULTAD DE CIENCIAS SOCIALES">FACULTAD DE CIENCIAS SOCIALES</option>
              <option value="FACULTAD DE CIENCIAS JURIDICAS Y POLITICAS">FACULTAD DE CIENCIAS JURIDICAS Y POLITICAS</option>
            </Field>
            <br />
            <br />
            <HPButton
              nameButton="Siguiente"
              isSubmitting={formikProps.isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
interface hpRegisterDatosProps {
  credencialesRegis?: creadencialesUsuario;
  idPeriodo: string
}
