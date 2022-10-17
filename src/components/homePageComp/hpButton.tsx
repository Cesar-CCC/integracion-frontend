import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import homePageCSS from "../../styles/homePage.module.css";
export default function HPButton(props: hpButtonProps) {
  // const [cargando, cargandoState] = useState();
  // useEffect(()=>{

  // },[cargando])
  return (
    <>
      {!props.isSubmitting ? (
        <button
          type="submit"
          className={homePageCSS.hpButton}
          onClick={props.onClick}
        >
          {props.nameButton}
        </button>
      ) : (
        <button
          type="submit"
          className={homePageCSS.hpButton}
          onClick={props.onClick}
          disabled={true}
        >
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Ingresando...
        </button>
      )}
    </>
  );
}
interface hpButtonProps {
  nameButton: string;
  onClick?(): void;
  isSubmitting?: boolean;
}
