import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import AuntenticationContext from "../../auth/autenticationContext";
import { logout } from "../../auth/manejadorJWT";
import  "../../styles/sgcStyle_homepage.css"
export default function HPNavbar(props: any) {
  const {names, actualizarClaims: actualizar } = useContext(AuntenticationContext);
  return (
    <>
      <Navbar expand="sm" variant="dark" className="sgcNavbar">
        <Container>
          <Navbar.Brand href="/">SGC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="#" className="text-light me-3">
              Bienvenido {names}
            </Nav.Link>
            <Nav.Link href="#" className="text-light me-3">
              <FaUserGraduate />
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                logout();
                actualizar([], '');
              }}
              className="text-danger"
            >
              <IoMdExit />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
