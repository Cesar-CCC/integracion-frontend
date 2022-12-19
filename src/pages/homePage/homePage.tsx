import { useContext, useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import AuntenticationContext from "../../auth/autenticationContext";
import { guardarTokenLocalStorage, logout, obtenerClaims, obtenerExpiracion, obtenerNames, obtenerToken, setNames } from "../../auth/manejadorJWT";
import BtnLoginRegister from "../../components/homePageComp/btnLoginRegister";
import HomePageComp from "../../components/homePageComp/homePageComp";
import HPNavbar from "../../components/homePageComp/hpNavbar";
import ModuleSGC from "../../components/homePageComp/moduleSGC";
import Autorizado from "../../auth/autorizado";
// import { esAdmin } from "../../utils/functions";
import HPLogin from "../../components/homePageComp/hpLogin";
import { Field, Form, Formik } from "formik";
import HPInput from "../../components/homePageComp/hpInput";
import { nCompletoFace, productoGet } from "../../utils/interfaces";
import { getNombreCompleto, getSend } from "../../utils/functions";
import axios from "axios";
import { urlactualizar, urlobtenerProductos } from "../../utils/endpopints";
import { respuestaAutenticacion } from "../../auth/auth.model";
import { subir } from "../../firebase/config";
import EditarPerfilComp from "../../components/tienda/editarPerfilComp";
import ProductoComp from "../../components/tienda/ProductoComp";
import VerProductoComp from "../../components/tienda/verProductoComp";

export default function HomePage() {
  // const [update, setUpdate] = useState(false);
  const { names, actualizarClaims } = useContext(AuntenticationContext);
  const [nCompleto, setNCompleto] = useState<nCompletoFace | null | undefined>();
  const [avatar, setAvatar] = useState<File | null | undefined>();
  async function UpdateData(data: any) {
    try {
      const tem: nCompletoFace = {
        nombres: data.names,
        apPaterno: data.apPater,
        apMaterno: data.apMater,
      };
      const act = getSend(tem, " ");
      const ant = getSend(nCompleto, "-");
      // actualizar avatar 
      if (avatar != undefined) {
        await subir(avatar, act);
      }
      // console.log(act);
      // console.log(ant);
      // console.log(nCompleto);
      await axios.put(urlactualizar, null,
        { params: { "newname": act, "name": ant } }
      );
      //-----
      setNCompleto(getNombreCompleto(getSend(tem, "-")));
      // console.log(act);
      // console.log(getNombreCompleto(act));
      // setNames(getSend(tem, "-"));
      // actualizarClaims(obtenerClaims(), getSend(tem, "-"));  // Actualizar los claims para obtener estos nuevos claims.
      // console.log(obtenerNames());
      //navigate1("/homepage/");
    }
    catch (err) {
      console.log(err);
    }
  }
  //-------------------------------
  //-------------------------------
  const [ventanaActual, setVentanaActual] = useState('verProductos');
  const cambiarVentana = (valor: string) => {
    setVentanaActual(valor);
  }
  const cambiarProducto = (valor: productoGet) => {
    setProducto(valor);
  }
  //
  const [productos, setProductos] = useState<productoGet[]>([]);
  const [producto, setProducto] = useState<productoGet>();
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
  //-------------------------------
  //-------------------------------
  useEffect(() => {
    obtenerProductos();
    if (obtenerNames() != null)
      setNCompleto(getNombreCompleto(obtenerNames()));
  }, []);
  return (
    <>
      <Autorizado
        autorizado={
          <>
            <HPNavbar nombres={nCompleto!} editFunction={(e: string) => cambiarVentana(e)} />
            <Container className="mt-5 mb-5 text-center d-flex justify-content-center">
              <Row className="w-100">
                <Col className="">
                  {(() => {
                    if (ventanaActual == 'editPerfil') {
                      return (
                        <EditarPerfilComp nombres={nCompleto!} UpdateData={(e: any) => UpdateData(e)} setAvatar={(e: any) => setAvatar(e)} cambiarVentana={(e: string) => cambiarVentana(e)} />
                      )
                    } else if (ventanaActual == 'verProducto') {
                      return (
                        <VerProductoComp producto={producto} />
                      )
                    } else if (ventanaActual == 'verProductos') {
                      return (
                        <Container fluid>
                          <Row>
                            {productos.map(producto =>
                              <Col className="col-3" key={producto.id}>
                                <ProductoComp producto={producto} cambiarProducto={(e: productoGet) => cambiarProducto(e)} cambiarVentana={(e: string) => cambiarVentana(e)} />
                              </Col>
                            )}
                          </Row>
                        </Container>
                      )
                    }
                  })()}
                </Col>
              </Row>
            </Container>
          </>
        }
        noAutorizado={
          <>
            <HomePageComp>
              <HPLogin />
            </HomePageComp>
          </>
        }
      />
    </>
  );
}
