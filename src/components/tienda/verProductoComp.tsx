import { Button, Col, Container, Row } from "react-bootstrap";
import { productoGet } from "../../utils/interfaces";

export default function VerProductoComp(props: verProductoProps) {
    return (
        <>
            <Container fluid className="w-100 mt-5">
                <Row>
                    <Col>
                        <Row className="mb-5">
                            <Col>
                                Nombre del producto:
                            </Col>
                            <Col>
                                {props.producto?.nombre}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Precio del producto:
                            </Col>
                            <Col>
                                {props.producto?.precio}
                            </Col>

                        </Row>
                    </Col>
                    <Col>
                        <img src={props.producto?.enlaceImagen} alt="no hay" width={100} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button className="mt-5 w-50 btn-danger">Comprar</Button>
                    </Col>
                </Row>
            </Container>
        </>)
}
interface verProductoProps {
    producto?: productoGet;
}
