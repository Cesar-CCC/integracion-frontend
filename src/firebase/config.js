import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDyDt-GVoNEzuA_YB45a_0ctWO1Sbl6z3w",
    authDomain: "e-commerce-integracion.firebaseapp.com",
    projectId: "e-commerce-integracion",
    storageBucket: "e-commerce-integracion.appspot.com",
    messagingSenderId: "307884407307",
    appId: "1:307884407307:web:ff6548f96949786fa7a50e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);

export async function subir(file, name){
    const sf = ref(storage, name)
    await uploadBytes(sf, file)
    const url = await getDownloadURL(sf)
    return url
}
export async function obtener(name){
    const storageRef = ref(storage, name)
    const url = await getDownloadURL(storageRef)
    return url
}
