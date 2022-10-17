import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import contratoCSS from "../../styles/contrato.module.css";
import { moduleSGCProps } from "../../utils/interfaces";
export default function ModuleSGC(props: moduleSGCProps) {
  return (
    <>
      <div className="m-2 d-none d-sm-none d-md-inline-block">
        <Link to={props.navigate} className="text-decoration-none">
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title className="fs-4 text-dark">{props.nombre}</Card.Title>
              {/* <Card.Text>Some quick example.</Card.Text> */}
              {props.estado ? (
                <div className="fs-5">
                  <Badge bg={props.bgBadgeEstado}>{props.estado}</Badge>
                  <Badge bg={props.bgBadgeEtapa} className="ms-2">
                    {props.etapa}
                  </Badge>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </Link>
      </div>
      <div className="m-2 d-inline-block d-sm-inline-block d-md-none">
        <Link to={props.navigate}  className="text-decoration-none">
          <Card style={{ width: "26rem" }}>
            <Card.Body>
              <Card.Title className="fs-4 text-dark">{props.nombre}</Card.Title>
              {/* <Card.Text>Some quick example.</Card.Text> */}
              {props.estado ? (
                <div className="fs-5">
                  <Badge bg="secondary">{props.estado}</Badge>
                  <Badge bg="secondary" className="ms-2">
                    {props.etapa}
                  </Badge>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
}
