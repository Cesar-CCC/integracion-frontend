import { Button, Card } from "react-bootstrap";
import { productoGet } from "../../utils/interfaces";

export default function ProductoComp(props: productoProps) {
    return (
        <>
            <Card style={{ width: '16rem' }} className="p-2">
                <Card.Img variant="top" src={props.producto.enlaceImagen} height={200} />
                <Card.Body>
                    <Card.Title>{props.producto.nombre}</Card.Title>
                    <Card.Text>
                        {props.producto.precio}
                    </Card.Text>
                    <Button variant="success" onClick={() => {
                        props.cambiarProducto(props.producto);
                        props.cambiarVentana('verProducto');
                    }}>Ver</Button>
                </Card.Body>
            </Card>
        </>)
}
interface productoProps {
    producto: productoGet;
    cambiarVentana(valor: string): void;
    cambiarProducto(valor: productoGet): void;
}
