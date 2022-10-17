import { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HPContenido from "./hpContenido";
import HPLogo from "./hpLogo";
import HPNavbar from "./hpNavbar";
import "../../styles/sgcStyle_login.css";
export default function HomePageComp(props: homePageCompProps) {
  return (
    <div className="sgcBackground">
      <div className="sgcBackground2">
        {/* <HPNavbar /> */}
        <Container fluid>
          {/* <Row>
          <Col className="mt-5 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            
          </Col>
        </Row> */}
          <Row>
            <Col>
              {props.children}
              {/* <BtnLoginRegister /> */}
              {/* <HPLogin></HPLogin> */}
              {/* <ModulesSGC /> */}
              {/* <Docente /> */}
            </Col>
          </Row>
          {/* <Row>
          <Col className="mt-5 col-md-6 offset-md-3 border border-dark d-flex justify-content-center">
            <HPContenido />
          </Col>
        </Row> */}
        </Container>
      </div>
    </div>
  );
}
interface homePageCompProps {
  children: ReactElement;
}
