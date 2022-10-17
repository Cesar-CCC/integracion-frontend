import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import routeSGC from "./routes/route-config";
import { claim } from "./auth/auth.model";
import AuntenticationContext from "./auth/autenticationContext";
import { obtenerClaims, obtenerNames } from "./auth/manejadorJWT";
import { esAdmin } from "./utils/functions";
import configIntercep from "./auth/interceptores";
configIntercep();
function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [names, setNames] = useState<string | null>('');
  function actualizarClaims(claims: claim[], names: string) {
    setClaims(claims);
    setNames(names);
  }
  // Obteneer claims cada vez que carguemos la pagina.
  useEffect(() => {
    setClaims(obtenerClaims());
    setNames(obtenerNames());
  }, []);
  return (
    <div>
      <BrowserRouter>
        <AuntenticationContext.Provider value={{ claims, actualizarClaims: actualizarClaims, names }}>
          <Routes>
            {routeSGC.map((routesgc) => (
              <Route
                key={routesgc.path}
                path={routesgc.path}
                element={
                  <routesgc.element />
                }
              />
            ))}
          </Routes>
        </AuntenticationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
