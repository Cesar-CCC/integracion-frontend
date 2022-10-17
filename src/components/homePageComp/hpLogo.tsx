import { Col, Container, Row } from "react-bootstrap";
export default function HPLogo() {
  return (
    <>
      <Container className="text-light">
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
          <Col className="text-center fs-6">
            <p>Universidad Nacional Del Altiplano</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
