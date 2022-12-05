import { async } from "@firebase/util";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { subir } from "../../firebase/config";
import { urlcrearProducto } from "../../utils/endpopints";
import { productoPostPut } from "../../utils/interfaces";

export default function AdministarProductos(){
    const [imgenProducto, setImgenProducto] = useState<File | null | undefined>();
    async function agregarProducto(data: any){
        try{
            const url = await subir(imgenProducto, data.nombre);
            const producto: productoPostPut ={
                nombre: data.nombre,
                enlaceImagen: url,
                precio: data.precio
            }
            await axios.post(urlcrearProducto, producto);
        }
        catch{
            console.log("Error --- al crear prodcuto.");
        }
    }
    return(<>
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
                    <div className="">
                        {/* <HPLogo /> */}
                        <Form>
                            <br />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="nombre"
                                className="p-2 m-3"
                                placeholder="Nombre del proiducto"
                            />
                            <Field
                                type="number"
                                autoComplete="off"
                                name="precio"
                                className="p-2  m-3"
                                placeholder="s/. 0.0"
                            />
                            <input type="file" name="avatar" onChange={x => setImgenProducto(x.target!.files![0])} />
                            <Button className="p-2 w-100 rounded-pill bg-success" type="submit">Agregar producto</Button>
                        </Form>
                    </div>
                )
                }
            </Formik >
    </>)
}
interface editarPerfilProps{
    // nombres?: nCompletoFace;
    // editFunction(e:string): void;
}