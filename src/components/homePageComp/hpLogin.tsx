import { Field, Form, Formik } from "formik";
import { Button, Col, Container, Image, Modal, Row, Spinner } from "react-bootstrap";
import "../../styles/sgcStyle_login.css";
import HPButton from "./hpButton";
import HPInput from "./hpInput";
import AuntenticationContext from "../../auth/autenticationContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  creadencialesUsuario,
  respuestaAutenticacion,
} from "../../auth/auth.model";
import axios from "axios";
import {
  guardarTokenLocalStorage,
  obtenerClaims,
} from "../../auth/manejadorJWT";
import ReCAPTCHA from "react-google-recaptcha";
import HPLogo from "./hpLogo";
import {
  urllogin,
  urlobtenerIdPeriodoActivo,
  urlregistrarCuenta,
} from "../../utils/endpopints";
// import "../../styles/homePage.module.css";
import FacebookLogin from "react-facebook-login";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { regisFace } from "../../utils/interfaces";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineFacebook } from "react-icons/md";
import { subir } from "../../firebase/config";
import { getNombreCompleto, getSend } from "../../utils/functions";
export default function HPLogin() {
  const navigate1 = useNavigate();
  const { claims, actualizarClaims } = useContext(AuntenticationContext);
  async function login(credenciales: creadencialesUsuario) {
    if (valorCaptcha != null) {
      try {
        const respuesta = await axios.post<respuestaAutenticacion>(
          urllogin,
          credenciales
        );
        guardarTokenLocalStorage(respuesta.data); // Manterner inicio de sesión
        actualizarClaims(obtenerClaims(), "test"); // Actualizar los claims para obtener estos nuevos claims.
        // console.log(respuesta.data);
        navigate1("/homepage/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("falta completar el reCaptcha");
    }
  }
  //-------------------------------------
  const [valorCaptcha, valorCaptchaState] = useState();
  function onChange(value: any) {
    // console.log("Captcha value:", value);
    valorCaptchaState(value);
  }

  //---------------------------------------------------
  //--------
  const guardarCreds = async (data: respuestaAutenticacion) => {
    guardarTokenLocalStorage(data); // Manterner inicio de sesión
    actualizarClaims(obtenerClaims(), data.names); // Actualizar los claims para obtener estos nuevos claims.
    navigate1("/homepage/");
    console.log("fsd");
  }
  //--
  const responseFacebook = async (response: any) => {
    const data: regisFace = {
      email: response.email,
      names: response.name,
    };
    // console.log(response);
    try {
      // ---------
      // Registrar cuenta en bd
      const respuesta = await axios.post(
        urlregistrarCuenta,
        data
      );
      // obteniendo imagen
      const url_ = response.picture.data.url;
      const originalImage=url_;
      const image = await fetch(originalImage);
      const imageBlog = await image.blob();
      // guardando imagen.
      // console.log(getSend(getNombreCompleto(respuesta.data.names),' '));
      // console.log(respuesta.data.names);
      await subir(imageBlog, getSend(getNombreCompleto(respuesta.data.names),' '));
      // guardar token de inicio de sesión
      guardarCreds(respuesta.data);
    } catch {
      // ---
      // Iniciar sesión
      const respuesta = await axios.get(
        urllogin,
        { params: { "email": data.email } }
      );
      // guardar token de inicio de sesión
      guardarCreds(respuesta.data);
    }
  };
  return (
    <div className="mt-5 mb-5 col-sm-12 col-md-8 col-lg-8 col-xl-5 col-xxl-3 mx-auto position-relative">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(valores) => {
          // await login(valores);
        }}
      >
        {(formikProps) => (
          <div className="p-5 sgcForm">
            <HPLogo />
            <Form>
              <h3 className="text-light">Acceder</h3>
              <br />
              <HPInput
                type="email"
                name="email"
                placeholder="Ingrese su correo"
              />
              <HPInput
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
              />
              <div className="position-relative"></div>
              <br />
              <div className="mt-4">
                <Container>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="bg-light text-start col-10 rounded-pill d-flex align-items-center">
                      <FcGoogle className="ms-3 fs-4" />
                      <p className="ms-3 mt-3 fs-6">
                        <strong>Continuar con Facebook</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-3">
                      <FacebookLogin
                        textButton="Continuar con Facebook"
                        appId="1185368355379662"
                        autoLoad={false}
                        fields="name,email,picture"
                        cssClass="logo bg-primary mt-2 ms-2"
                        callback={responseFacebook}
                        icon={
                          <MdOutlineFacebook className="ms-4 me-3 text-light fs-2"></MdOutlineFacebook>
                        }
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <ReCAPTCHA
                  sitekey="6LfFDLAgAAAAAA1_apCRuV8bOcIYqTWFr9OeTBDd"
                  onChange={onChange}
                  theme="dark"
                />
              </div>
              <br />
              <HPButton
                nameButton="Ingresar"
                isSubmitting={formikProps.isSubmitting}
              />
            </Form>
            <div className="text-center mt-4">
              <Row>
                <Col md={6}>
                  <Button
                    className="mt-3 bg-transparent border-0"
                    onClick={() => {}}
                  >
                    <p className="textFace">Registrarse</p>
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="text-light bg-transparent border-0"
                    // onClick={}
                  >
                    <p className="textFace">¿Has olvidado tu contraseña?</p>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Formik>
      {/* ---------------- */}
    </div>
  );
}
