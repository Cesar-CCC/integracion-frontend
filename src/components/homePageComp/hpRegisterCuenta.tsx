import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import HPButton from "./hpButton";
import HPInput from "./hpInput";
import "../../styles/sgcStyle_login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { creadencialesUsuario } from "../../auth/auth.model";
import ReCAPTCHA from "react-google-recaptcha";
import HpRegisterDatos from "./hpRegisterDatos";
import axios, { AxiosResponse } from "axios";
import { urlobtenerIdPeriodoActivo } from "../../utils/endpopints";
import * as yup from 'yup'
import YupPassword from 'yup-password'
import HPLogo from "./hpLogo";
import NotFound from "../../routes/notFound";
import { debug } from "console";
YupPassword(yup) // extend yup
export default function HpRegisterCuenta() {
  const navigate1 = useNavigate();
  const [creds, credsState] = useState<creadencialesUsuario>();
  async function registrar(credenciales: creadencialesUsuario) {
    // if (valorCaptcha != null) {
    try {
      // const respuesta = await axios.post<respuestaAutenticacion>(
      //   "https://localhost:44324/api/cuentas/registrar",
      //   credenciales
      // );
      // guardarTokenLocalStorage(respuesta.data);
      // actualizar(obtenerClaims());
      // console.log(respuesta.data);

      // axios.get(urlsiExisteUsuario, { params: { "Email": credenciales.email } })
      //   .then((respuesta: AxiosResponse<boolean>) => {
      //     if (!respuesta.data) {
      //       credsState(credenciales);
      //     }
      //   })

      credsState(credenciales);
      // axios.post(urlsiExisteUsuario, credenciales)
      //   .then((respuesta: AxiosResponse<boolean>) => {
      //     if (!respuesta.data) {
      //     }
      //   })
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   console.log("falta completar el reCaptcha");
    // }
  }
  //------------------------------------------
  const [valorCaptcha, valorCaptchaState] = useState();
  function onChange(value: any) {
    console.log("Captcha value:", value);
    valorCaptchaState(value);
  }
  //-----------------------------------------------
  const [periodoActivoID, periodoActivoIDState] = useState<string>("-1");
  async function obtenerIdPeriodoActivo() {
    try {
      const respuesta = await axios.get(
        urlobtenerIdPeriodoActivo,
      );
      periodoActivoIDState(respuesta.data);
      //console.log(respuesta.data);
    } catch (error) {
      console.log(error);
      return "-1"
    }
  }
  useEffect(() => {
    obtenerIdPeriodoActivo();
  }, []);
  return (
    <div className="mt-5 mb-5 col-sm-12 col-md-8 col-lg-5 col-xl-5 col-xxl-3 mx-auto position-relative">
      {periodoActivoID != "-1" ?
        <>
          {creds == null ? (
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async (valores) => await registrar(valores)}
              validationSchema={yup.object({
                email: yup.string().email('Invalid email format').required('Required'),
                password: yup.string().password().required(),
              }
              )}
            >
              {(formikProps) => (
                <div className="p-5 sgcForm">
                  <Form>
                    <HPLogo />
                    <h3 className="text-light">Registrarse</h3>
                    <br />
                    <HPInput
                      type="email"
                      name="email"
                      placeholder="Ingrese un correo"
                    />
                    <HPInput
                      type="password"
                      name="password"
                      placeholder="Ingrese una contraseña"
                    />
                    <br />
                    <div className="d-flex align-items-center justify-content-center">
                      <ReCAPTCHA
                        sitekey="6LfFDLAgAAAAAA1_apCRuV8bOcIYqTWFr9OeTBDd"
                        onChange={onChange}
                        theme="dark"
                      />
                    </div>
                    <br />
                    <HPButton
                      nameButton="Siguiente"
                      isSubmitting={formikProps.isSubmitting}
                    />
                  </Form>
                  <Button
                    className="mt-3 bg-transparent border-0 text-secondary fs-6"
                    onClick={() => navigate1("/homepage/login/")}
                  >
                    Iniciar sesión
                  </Button>
                </div>
              )}
            </Formik>
          ) : (
            <HpRegisterDatos credencialesRegis={creds} idPeriodo={periodoActivoID} />
          )
          }
        </>
        : null}
    </div >
  );
}
