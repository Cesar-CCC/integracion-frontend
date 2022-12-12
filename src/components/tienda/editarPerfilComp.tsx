import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { nCompletoFace } from "../../utils/interfaces";

export default function EditarPerfilComp(props: editarPerfilProps) {
    return (
        <>
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
                        {/* <HPLogo /> */}

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
                            <input type="file" name="avatar" onChange={x => props.setAvatar(x.target!.files![0])} />
                            <Button className="p-2 w-100 rounded-pill bg-success" type="submit">Actualizar</Button>
                        </Form>
                    </div>
                )
                }
            </Formik >
        </>)
}
interface editarPerfilProps{
    nombres?: nCompletoFace;
    UpdateData(data: any): void;
    setAvatar(file: File): void;
}
