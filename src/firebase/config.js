import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyB0w1jS4TTJspMuz8YgDRr0dlPN3HGG0M4",
    authDomain: "prubebaloginfacebook.firebaseapp.com",
    projectId: "prubebaloginfacebook",
    storageBucket: "prubebaloginfacebook.appspot.com",
    messagingSenderId: "766464025742",
    appId: "1:766464025742:web:b1d7129cd7837ddc4c15df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);

// para imagenes no es nesesario colocar .jpg ...
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
