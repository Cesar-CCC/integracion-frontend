import { useContext, useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import AuntenticationContext from "../../auth/autenticationContext";
import { logout, obtenerClaims } from "../../auth/manejadorJWT";
import BtnLoginRegister from "../../components/homePageComp/btnLoginRegister";
import HomePageComp from "../../components/homePageComp/homePageComp";
import HPNavbar from "../../components/homePageComp/hpNavbar";
import ModuleSGC from "../../components/homePageComp/moduleSGC";
import Autorizado from "../../auth/autorizado";
import { esAdmin } from "../../utils/functions";
import HPLogin from "../../components/homePageComp/hpLogin";
export default function HomePage() {
  useEffect(() => {
    
  }, []);
  return (
    <>
      <Autorizado
        autorizado={
          <>
            <HPNavbar />
            <Carousel controls={false} indicators={false} className="bg-dark">
              <Carousel.Item>
                <img
                  className="d-block w-100 opacity-25"
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
            <Container className="mt-4 mb-5 text-center">
              <Row>
                <Col>
                  <ModuleSGC
                    nombre="Módulo"
                    etapa="etapa"
                    estado=""
                    navigate={"/"}
                  />
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
