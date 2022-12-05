import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { claim } from "./auth/auth.model";
import AuntenticationContext from "./auth/autenticationContext";
import { obtenerClaims, obtenerNames } from "./auth/manejadorJWT";
import configIntercep from "./auth/interceptores";
import HomePage from "./pages/homePage/homePage";
import NotFound from "./routes/notFound";
import HomePageLogin from "./pages/homePage/homePageLogin";
import AdministarProductos from "./components/tienda/administarProductos";
configIntercep();
function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [names, setNames] = useState<string | null | undefined>('');
  function actualizarClaims(claims: claim[], names: string | null | undefined) {
    setClaims(claims);
    setNames(names!);
  }
  // Obteneer claims cada vez que carguemos la pagina.
  useEffect(() => {
    setClaims(obtenerClaims());
    setNames(obtenerNames());
    console.log("names");
  }, []);
  return (
    <div>
      <BrowserRouter>
        <AuntenticationContext.Provider value={{ claims, actualizarClaims: actualizarClaims, names }}>
          <Routes>
            <Route
              path={"/"}
              element={
                <HomePage />
              }
            />
            <Route
              path={"/homepage/login"}
              element={
                <HomePageLogin />
              }
            />
            <Route
              path={"/admin/producto"}
              element={
                <AdministarProductos />
              }
            />
            <Route
              path={"*"}
              element={
                <NotFound />
              }
            />
          </Routes>
        </AuntenticationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
