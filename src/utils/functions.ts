import { nCompletoFace } from "./interfaces";

export const getNombreCompleto = (nComleto: string | null | undefined) => {
  const tem = nComleto!.split("-");
  let nc = "";
  for (var i = 0; i < tem.length - 2; i++)
    nc += i == tem.length - 3 ? tem[i] : tem[i] + " ";
  const res: nCompletoFace = {
    nombres: nc,
    apPaterno: tem[tem.length - 2],
    apMaterno: tem[tem.length - 1],
  };
  return res;
};
export const getSend = (nComleto: nCompletoFace | null | undefined, sc: string) => {
    const tem = nComleto!.nombres!.split(" ");
    // console.log(tem);
    let nc = "";
    for (var i = 0; i < tem.length; i++)
      nc += i == tem.length - 1 ? tem[i] : tem[i] + sc;
    // console.log("nc");
    const res = nc + sc + nComleto?.apPaterno + sc + nComleto?.apMaterno;
    return res;
  };
