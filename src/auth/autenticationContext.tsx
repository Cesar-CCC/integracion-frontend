import React from "react";
import { claim } from "./auth.model";
const AuntenticationContext = React.createContext<{
  claims: claim[];
  actualizarClaims(claims: claim[], names: string | null): void;
  names: string | null;
}>({ claims: [], actualizarClaims: () => {}, names:  '' });

export default AuntenticationContext;