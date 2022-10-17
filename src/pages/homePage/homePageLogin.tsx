import { Navigate } from "react-router-dom";
import Autorizado from "../../auth/autorizado";
import HomePageComp from "../../components/homePageComp/homePageComp";
import HPLogin from "../../components/homePageComp/hpLogin";
export default function HomePageLogin() {
  return (
    <>
      <Autorizado
        autorizado={
          <>
            <Navigate replace to="/" />
          </>
        }
        noAutorizado={
          <>
            <HomePageComp>
              <HPLogin></HPLogin>
            </HomePageComp>
          </>
        }
      />
    </>
  );
}
