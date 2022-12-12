import { Console } from "console";
import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import internal from "stream";
import AuntenticationContext from "../../auth/autenticationContext";
import { logout } from "../../auth/manejadorJWT";
import { obtener } from "../../firebase/config";
import "../../styles/sgcStyle_homepage.css"
import { getNombreCompleto, getSend } from "../../utils/functions";
import { nCompletoFace } from "../../utils/interfaces";
export default function HPNavbar(props: hPNavbarProps) {
  const { actualizarClaims: actualizar } = useContext(AuntenticationContext);
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
      <Navbar expand="sm" variant="dark" className="sgcNavbar">
        <Container>
          <Navbar.Brand href="/">Productos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <button onClick={() => props.test()}>Aumentar</button> */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link onClick={()=>props.editFunction('editPerfil')} className="text-light me-3">
              Bienvenido {getSend(props.nombres, ' ')}
            </Nav.Link>
            <Nav.Link onClick={()=>props.editFunction('editPerfil')} className="text-light me-3">
              {/* <FaUserGraduate /> */}
              <img src={avatar} alt="" className="rounded-pill" height={40} width={40} />
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                logout();
                actualizar([], '');
              }}
              className="text-danger fs-4"
            >
              <IoMdExit />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
interface hPNavbarProps {
  nombres?: nCompletoFace;
  editFunction(e:string): void;
}
