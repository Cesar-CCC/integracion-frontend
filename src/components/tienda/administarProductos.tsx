import { async } from "@firebase/util";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { subir } from "../../firebase/config";
import { urlcrearProducto, urlobtenerProductos } from "../../utils/endpopints";
import { productoGet, productoPostPut } from "../../utils/interfaces";
import ProductoComp from "./ProductoComp";

export default function AdministarProductos() {
    const [imgenProducto, setImgenProducto] = useState<File | null | undefined>();
    const [productos, setProductos] = useState<productoGet[]>([]);
    const [producto, setProducto] = useState<productoGet>();
    const [estado, setEstado] = useState("ver");

    async function agregarProducto(data: any) {
        try {
            const url = await subir(imgenProducto, data.nombre);
            const producto: productoPostPut = {
                nombre: data.nombre,
                enlaceImagen: url,
                precio: data.precio
            }
            await axios.post(urlcrearProducto, producto);
        }
        catch {
            console.log("Error --- al crear prodcuto.");
        }
    }
    async function obtenerProductos() {
        try {
            const res = await axios.get(urlobtenerProductos);
            console.log(res.data);
            setProductos(res.data);
        }
        catch
        {
            console.log("erro get productos");
        }
    }
    const cambiarProducto = (valor: productoGet) => {
        setProducto(valor);
    }
    const cambiarVentana = (valor: string) => {
        setEstado(valor)
    }
    useEffect(() => {
        obtenerProductos();
    }, []);
    return (<>
        <Container className="mt-5">
            <Row>
                <Row>
                    <Col className="text-center">
                        <h4>Administrar Productos</h4>
                    </Col>
                </Row>
                <Row className="mt-5 d-flex justify-content-center">
                    <Col className="col-2 d-flex justify-content-center"><Button className={estado == "ver" ? "bg-transparent text-dark" : ""} onClick={() => setEstado("ver")}>Ver productos</Button></Col>
                    <Col className="col-2 d-flex justify-content-center"><Button className={estado == "agregar" ? "bg-transparent text-dark" : ""} onClick={() => setEstado("agregar")}>Agregar productos</Button></Col>
                </Row>
                <Row>
                    <Container className="mt-5">
                        <Row>
                            {(() => {
                                if (estado == 'ver') {
                                    return (
                                        <>
                                            {productos.map(producto =>
                                                <Col key={producto.id} className="col-3">
                                                    <ProductoComp producto={producto} cambiarProducto={(e: productoGet) => cambiarProducto(e)} cambiarVentana={(e: string) => cambiarVentana(e)} />
                                                </Col>
                                            )}</>
                                    )
                                } else if (estado == 'agregar') {
                                    return (
                                        <Col>
                                            <Formik
                                                initialValues={{
                                                    nombre: "",
                                                    precio: 0.0,
                                                }}
                                                onSubmit={(valores) => {
                                                    agregarProducto(valores);
                                                }}
                                            >
                                                {(formikProps) => (
                                                    <div className=" d-flex justify-content-center">
                                                        {/* <HPLogo /> */}
                                                        <Form>
                                                            <br />
                                                            <div className="form-group">
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="nombre"
                                                                    className="p-2 m-3"
                                                                    placeholder="Nombre del producto"
                                                                />
                                                                <Field
                                                                    type="number"
                                                                    autoComplete="off"
                                                                    name="precio"
                                                                    className="p-2  m-3"
                                                                    placeholder="s/. 0.0"
                                                                />
                                                            </div>
                                                            <div className="form-group mt-3 mb-3">
                                                                <input type="file" name="avatar" onChange={x => setImgenProducto(x.target!.files![0])} />
                                                            </div>
                                                            <div className="form-group d-flex justify-content-center">
                                                                <Button className="p-2 w-50 bg-success" type="submit">Agregar producto</Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                )
                                                }
                                            </Formik >
                                        </Col>
                                    )
                                } else if (estado == 'verProducto') { //editar
                                    return (
                                        <Col className="text-center">
                                            <h3>Editar producto</h3>
                                            <Formik
                                                initialValues={{
                                                    nombre: producto?.nombre,
                                                    precio: producto?.precio,
                                                }}
                                                onSubmit={(valores) => {
                                                    agregarProducto(valores);
                                                }}
                                            >
                                                {(formikProps) => (
                                                    <div className=" d-flex justify-content-center">
                                                        {/* <HPLogo /> */}
                                                        <Form>
                                                            <br />
                                                            <div className="form-group">
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="nombre"
                                                                    className="p-2 m-3"
                                                                    placeholder="Nombre del producto"
                                                                />
                                                                <Field
                                                                    type="number"
                                                                    autoComplete="off"
                                                                    name="precio"
                                                                    className="p-2  m-3"
                                                                    placeholder="s/. 0.0"
                                                                />
                                                            </div>
                                                            <div className="mt-3 mb-3">
                                                                <img src={producto?.enlaceImagen} height={200} />
                                                            </div>
                                                            <div className="form-group mt-3 mb-3">
                                                                <input type="file" name="avatar" onChange={x => setImgenProducto(x.target!.files![0])} />
                                                            </div>
                                                            <div className="form-group d-flex justify-content-center">
                                                                <Button className="p-2 w-50 bg-success" type="submit">Agregar producto</Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                )
                                                }
                                            </Formik >
                                        </Col>
                                    )
                                }
                            })()}
                        </Row>
                    </Container>
                </Row>
            </Row>
        </Container>
    </>)
}
interface editarPerfilProps {
    // nombres?: nCompletoFace;
    // editFunction(e:string): void;
}