import { Col, Container, Row } from "react-bootstrap";
import { SiHomeassistantcommunitystore } from 'react-icons/si';
export default function HPLogo() {
  return (
    <>
      <Container className="text-light">
        <Row>
          <Col className="text-center">
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo_UNAP.png"
              className="mb-4"
              alt="unap"
              width={90}
              height={90}
            /> */}
            <SiHomeassistantcommunitystore  className="fs-2 mb-4"/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
