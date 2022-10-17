import { Field } from "formik";
import homePageCSS from "../../styles/homePage.module.css";
export default function HPInput(props: hpInputProps) {
  return (
    <>
      <br />
      <div className={homePageCSS.hpFormGroup + " form-group position-relative"}>
        <Field
          type={props.type}
          autoComplete="off"
          name={props.name}
          className={homePageCSS.hpField}
          placeholder={props.placeholder}
        />
        <span className={homePageCSS.hpfocusBorder}></span>
      </div>
      {/* <div className="form-floating mb-3">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Email address</label>
      </div> */}
    </>
  );
}
interface hpInputProps {
  placeholder: string;
  type: string;
  name: string;
}
