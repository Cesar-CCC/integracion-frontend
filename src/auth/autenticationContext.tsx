import React from "react";
import { claim } from "./auth.model";
const AuntenticationContext = React.createContext<{
  claims: claim[];
  actualizarClaims(claims: claim[], names: string | null | undefined): void;
  names: string | null | undefined;
}>({ claims: [], actualizarClaims: () => {}, names:  '' });

export default AuntenticationContext;