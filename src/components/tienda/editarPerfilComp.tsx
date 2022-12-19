import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { obtener } from "../../firebase/config";
import { getSend } from "../../utils/functions";
import { nCompletoFace } from "../../utils/interfaces";

export default function EditarPerfilComp(props: editarPerfilProps) {
    const [avatar, setAvatar] = useState("");
    async function traer() {
        const a = await obtener(`${getSend(props.nombres, " ")}`);
        setAvatar(a);
    }
    useEffect(() => {
        traer();
    })
    return (
        <>
            <Button onClick={() => props.cambiarVentana("verProductos")}>Volver</Button>
            <Formik
                initialValues={{
                    names: props.nombres?.nombres,
                    apPater: props.nombres?.apPaterno,
                    apMater: props.nombres?.apMaterno,
                }}
                onSubmit={(valores) => {
                    props.UpdateData(valores);
                }}
            >
                {(formikProps) => (
                    <div className="">
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
                            <br />
                            <img src={avatar} alt="avatar" className="mt-3 mb-3 rounded-pill" />
                            <br />
                            <input className="mb-3" type="file" name="avatar" onChange={x => props.setAvatar(x.target!.files![0])} />
                            <br />
                            <Button className="p-2 w-25 bg-success" type="submit">Actualizar</Button>
                        </Form>
                    </div>
                )
                }
            </Formik >
        </>)
}
interface editarPerfilProps {
    nombres?: nCompletoFace;
    cambiarVentana(valor: any): void;
    UpdateData(data: any): void;
    setAvatar(file: File): void;
}
