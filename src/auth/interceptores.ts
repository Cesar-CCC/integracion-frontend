import axios from "axios";
import { obtenerToken } from "./manejadorJWT";

export default function configIntercep(){
    axios.interceptors.request.use(
        function (config){
            const token = obtenerToken();
            if(token){
                config.headers!.Authorization = `bearer ${token}`;
            }
            return config;
        },
        function(error){
            return Promise.reject(error);
        }
    )
}