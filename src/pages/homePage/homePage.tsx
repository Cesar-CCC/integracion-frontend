import { useContext, useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import AuntenticationContext from "../../auth/autenticationContext";
import { guardarTokenLocalStorage, logout, obtenerClaims, obtenerExpiracion, obtenerNames, obtenerToken, setNames } from "../../auth/manejadorJWT";
import BtnLoginRegister from "../../components/homePageComp/btnLoginRegister";
import HomePageComp from "../../components/homePageComp/homePageComp";
import HPNavbar from "../../components/homePageComp/hpNavbar";
import ModuleSGC from "../../components/homePageComp/moduleSGC";
import Autorizado from "../../auth/autorizado";
// import { esAdmin } from "../../utils/functions";
import HPLogin from "../../components/homePageComp/hpLogin";
import { Field, Form, Formik } from "formik";
import HPInput from "../../components/homePageComp/hpInput";
import { nCompletoFace } from "../../utils/interfaces";
import { getNombreCompleto, getSend } from "../../utils/functions";
import axios from "axios";
import { urlactualizar } from "../../utils/endpopints";
import { respuestaAutenticacion } from "../../auth/auth.model";
import { subir } from "../../firebase/config";

export default function HomePage() {
  const [update, setUpdate] = useState(false);
  const { names, actualizarClaims } = useContext(AuntenticationContext);
  const [nCompleto, setNCompleto] = useState<nCompletoFace | null | undefined>();
  const [avatar, setAvatar] = useState<File | null | undefined>();
  async function UpdateData(data: any) {
    try {
      const tem: nCompletoFace = {
        nombres: data.names,
        apPaterno: data.apPater,
        apMaterno: data.apMater,
      };
      const act = getSend(tem, " ");
      const ant = getSend(nCompleto, "-");
      // actualizar avatar 
      if(avatar!=undefined){
        await subir(avatar, act);
      }
      // console.log(act);
      // console.log(ant);
      // console.log(nCompleto);
      await axios.put(urlactualizar, null,
        { params: { "newname": act, "name": ant } }
      );
      //-----
      setNCompleto(getNombreCompleto(getSend(tem, "-")));
      // console.log(act);
      // console.log(getNombreCompleto(act));
      // setNames(getSend(tem, "-"));
      // actualizarClaims(obtenerClaims(), getSend(tem, "-"));  // Actualizar los claims para obtener estos nuevos claims.
      // console.log(obtenerNames());
      //navigate1("/homepage/");
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (obtenerNames() != null)
      setNCompleto(getNombreCompleto(obtenerNames()));
  }, []);
  return (
    <>
      <Autorizado
        autorizado={
          <>
            <HPNavbar nombres={nCompleto!}/>
            <Carousel controls={false} indicators={false} className="bg-dark">
              <Carousel.Item>
                <img
                  className="d-block w-100 opacity-50"
                  src="https://tramites.unap.edu.pe/images/slide/slide-1.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <Container>
                    <Row>
                      <Col className="text-center">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_UNAP.png"
                          className="mb-4"
                          alt="unap"
                          width={90}
                          height={90}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center h5">
                        <p>Universidad Nacional Del Altiplano</p>
                      </Col>
                    </Row>
                  </Container>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Container className="mt-5 mb-5 text-center d-flex justify-content-center">
              <Row>
                <Col className="">
                  {update ?
                    <Formik
                      initialValues={{
                        names: nCompleto?.nombres,
                        apPater: nCompleto?.apPaterno,
                        apMater: nCompleto?.apMaterno,
                      }}
                      onSubmit={(valores) => {
                        UpdateData(valores);
                      }}
                    >
                      {(formikProps) => (
                        <div className="">
                          {/* <HPLogo /> */}
                          <Button className="p-2 rounded-pill bg-dark" onClick={() => setUpdate(false)}>Regresar</Button>
                          <Form>
                            <br />
                            <Field
                              type="text"
                              autoComplete="off"
                              name="names"
                              className="p-2 m-3"
                              placeholder="Nombres"
                            />
                            <Field
                              type="text"
                              autoComplete="off"
                              name="apPater"
                              className="p-2  m-3"
                              placeholder="Ap. Paterno"
                            />
                            <Field
                              type="text"
                              autoComplete="off"
                              name="apMater"
                              className="p-2 m-3"
                              placeholder="Ap. Materno"
                            />
                            <input type="file" name="avatar" onChange={x=>setAvatar(x.target!.files![0])}/>
                            <Button className="p-2 w-100 rounded-pill bg-success" type="submit">Actualizar</Button>
                          </Form>
                        </div>
                      )
                      }
                    </Formik >
                    :
                    <Button className="p-3 rounded-pill bg-dark" onClick={() => setUpdate(true)}>Actualizar datos</Button>
                  }
                </Col>
              </Row>
            </Container>
          </>
        }
        noAutorizado={
          <>
            <HomePageComp>
              <HPLogin />
            </HomePageComp>
          </>
        }
      />
    </>
  );
}
