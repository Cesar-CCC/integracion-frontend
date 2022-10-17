import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HPButton from "./hpButton";

export default function BtnLoginRegister() {
  const navigate1 = useNavigate();
  return (
    <>
      {/* <Stack gap={4} className="mt-5 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-2 mx-auto">
        <HPButton nameButton="Iniciar sesión" onClick={() => navigate1("/homepage/login")}/>
        <HPButton nameButton="Registrarse" onClick={() => navigate1("/homepage/register/cuenta")}/>
      </Stack> */}
    </>
  );
}
